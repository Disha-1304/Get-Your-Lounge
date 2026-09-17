const prisma        = require('../config/prisma');
const emailService  = require('../services/emailService');

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

// ─── GET /api/admin/bookings ──────────────────────────────────────────────────
// All bookings with optional filters: status, loungeId, date range, pagination
const listBookings = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    const where = {};

    if (req.query.status && VALID_STATUSES.includes(req.query.status)) {
      where.status = req.query.status;
    }
    if (req.query.loungeId) {
      where.loungeId = req.query.loungeId;
    }
    if (req.query.from || req.query.to) {
      where.visitDate = {};
      if (req.query.from) where.visitDate.gte = new Date(req.query.from);
      if (req.query.to)   where.visitDate.lte = new Date(req.query.to);
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take:    limit,
        orderBy: { createdAt: 'desc' },
        include: {
          lounge: { select: { id: true, name: true, airportCode: true, city: true } },
          user:   { select: { id: true, email: true, name: true, phone: true } },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    res.json({
      data: bookings,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('admin listBookings error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── PATCH /api/admin/bookings/:id/status ────────────────────────────────────
// Manually change booking status; triggers email if status → CONFIRMED
const updateBookingStatus = async (req, res) => {
  try {
    const { id }     = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const existing = await prisma.booking.findUnique({
      where:   { id },
      include: {
        lounge: true,
        user:   true,
      },
    });
    if (!existing) return res.status(404).json({ message: 'Booking not found' });

    const booking = await prisma.booking.update({
      where:   { id },
      data:    { status },
      include: {
        lounge: { select: { id: true, name: true, airportCode: true, city: true, terminal: true } },
        user:   { select: { id: true, email: true, name: true } },
      },
    });

    // ── Email triggers ──────────────────────────────────────────────────────
    if (status === 'CONFIRMED') {
      emailService.sendConfirmationEmail(booking, booking.lounge, booking.user)
        .catch(err => console.error('Email send failed (non-fatal):', err));
    }
    if (status === 'CANCELLED') {
      emailService.sendCancellationEmail(booking, booking.lounge, booking.user)
        .catch(err => console.error('Email send failed (non-fatal):', err));
    }

    res.json(booking);
  } catch (err) {
    console.error('admin updateBookingStatus error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { listBookings, updateBookingStatus };
