const prisma       = require('../config/prisma');
const emailService = require('../services/emailService');

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
const CANCELLATION_CUTOFF_HOURS = 24;

// ─── POST /api/bookings ───────────────────────────────────────────────────────
// Creates a booking with transaction-isolated capacity check per calendar day.
const createBooking = async (req, res) => {
  try {
    const {
      loungeId,
      userId: bodyUserId,
      visitDate,
      numberOfGuests,
      flightNumber,
    } = req.body;

    // Target user is either attached by authenticateUser middleware or passed in body
    const targetUserId = req.user ? req.user.id : bodyUserId;
    if (!targetUserId) {
      return res.status(400).json({ message: 'userId is required (or provide Authorization Bearer token)' });
    }

    const parsedDate = new Date(visitDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid visitDate format' });
    }

    const guests = typeof numberOfGuests === 'number' && numberOfGuests > 0 ? numberOfGuests : 1;

    // Calculate calendar day range for capacity checking
    const startOfDay = new Date(parsedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(parsedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Verify lounge exists & is active
    const lounge = await prisma.lounge.findFirst({
      where: { OR: [{ id: loungeId }, { legacyId: loungeId }], isActive: true },
    });
    if (!lounge) {
      return res.status(404).json({ message: 'Lounge not found or is currently inactive' });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
      return res.status(404).json({ message: 'User record not found' });
    }

    const totalPrice = parseFloat((lounge.price * guests).toFixed(2));

    // ── Execute capacity check and booking creation in a DB transaction ─────────
    const newBooking = await prisma.$transaction(async (tx) => {
      // Check lounge daily capacity if configured
      if (lounge.capacity !== null && lounge.capacity !== undefined) {
        const aggregate = await tx.booking.aggregate({
          _sum: { numberOfGuests: true },
          where: {
            loungeId: lounge.id,
            visitDate: {
              gte: startOfDay,
              lte: endOfDay,
            },
            status: { not: 'CANCELLED' },
          },
        });

        const currentBookedGuests = aggregate._sum.numberOfGuests || 0;
        const availableCapacity = lounge.capacity - currentBookedGuests;

        if (currentBookedGuests + guests > lounge.capacity) {
          const capError = new Error(
            `Lounge is full on this date (${startOfDay.toISOString().split('T')[0]}). ` +
            `Daily capacity: ${lounge.capacity}, currently booked: ${currentBookedGuests}, available: ${Math.max(0, availableCapacity)}.`
          );
          capError.statusCode = 409;
          throw capError;
        }
      }

      return await tx.booking.create({
        data: {
          loungeId:       lounge.id,
          userId:         user.id,
          visitDate:      parsedDate,
          numberOfGuests: guests,
          totalPrice,
          currency:       lounge.currency,
          flightNumber:   flightNumber || null,
        },
        include: {
          lounge: {
            select: {
              id: true, legacyId: true, name: true,
              airportCode: true, city: true, terminal: true,
            },
          },
          user: { select: { id: true, email: true, name: true } },
        },
      });
    });

    // ── Fire-and-forget pending confirmation email ────────────────────────────
    emailService.sendPendingEmail(newBooking, newBooking.lounge, newBooking.user)
      .catch(err => console.error('[bookings] Pending email error (non-fatal):', err.message));

    res.status(201).json(newBooking);
  } catch (err) {
    if (err.statusCode === 409) {
      return res.status(409).json({ message: err.message });
    }
    console.error('createBooking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET /api/bookings/:id ────────────────────────────────────────────────────
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        lounge: true,
        user:   { select: { id: true, email: true, name: true, phone: true } },
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error('getBookingById error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── PATCH /api/bookings/:id/cancel ──────────────────────────────────────────
// User-facing cancellation endpoint (requires user auth & 24h cutoff check)
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        lounge: true,
        user:   { select: { id: true, email: true, name: true } },
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify ownership: req.user must match booking.userId (or booking user's email)
    if (req.user && req.user.id !== booking.userId && req.user.email !== booking.user.email) {
      return res.status(403).json({ message: 'Forbidden: You can only cancel your own bookings.' });
    }

    // Check if already cancelled
    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ message: 'Booking is already cancelled.' });
    }

    // 24-hour cancellation cutoff rule
    const visitTime = new Date(booking.visitDate).getTime();
    const now = Date.now();
    const hoursUntilVisit = (visitTime - now) / (1000 * 60 * 60);

    if (hoursUntilVisit < CANCELLATION_CUTOFF_HOURS) {
      return res.status(400).json({
        message: `Cancellation window has passed. Bookings can only be cancelled at least ${CANCELLATION_CUTOFF_HOURS} hours prior to the visit date.`,
      });
    }

    // Perform cancellation
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data:  { status: 'CANCELLED' },
      include: {
        lounge: { select: { id: true, name: true, airportCode: true, city: true, terminal: true } },
        user:   { select: { id: true, email: true, name: true } },
      },
    });

    // Fire cancellation email
    emailService.sendCancellationEmail(updatedBooking, updatedBooking.lounge, updatedBooking.user)
      .catch(err => console.error('[bookings] Cancellation email error:', err.message));

    res.json(updatedBooking);
  } catch (err) {
    console.error('cancelBooking error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── PATCH /api/bookings/:id/status ──────────────────────────────────────────
// Admin status update endpoint
const updateBookingStatus = async (req, res) => {
  try {
    const { id }     = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data:  { status },
      include: {
        lounge: { select: { id: true, name: true, airportCode: true, city: true, terminal: true } },
        user:   { select: { id: true, email: true, name: true } },
      },
    });

    // Email triggers
    if (status === 'CONFIRMED') {
      emailService.sendConfirmationEmail(booking, booking.lounge, booking.user)
        .catch(err => console.error('[bookings] Confirmation email error:', err.message));
    }
    if (status === 'CANCELLED') {
      emailService.sendCancellationEmail(booking, booking.lounge, booking.user)
        .catch(err => console.error('[bookings] Cancellation email error:', err.message));
    }

    res.json(booking);
  } catch (err) {
    console.error('updateBookingStatus error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  CANCELLATION_CUTOFF_HOURS,
};
