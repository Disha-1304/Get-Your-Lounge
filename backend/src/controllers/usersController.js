const prisma = require('../config/prisma');

// ─── POST /api/users ─────────────────────────────────────────────────────────
// Creates a user or upserts if the email already exists
const createUser = async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    const user = await prisma.user.upsert({
      where:  { email },
      update: {
        ...(name  !== undefined && { name }),
        ...(phone !== undefined && { phone }),
      },
      create: { email, name: name || null, phone: phone || null },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── GET /api/users/:userId/bookings ─────────────────────────────────────────
// Returns all bookings for a specific user, with lounge details included.
// Protected by authenticateUser middleware to ensure users only access their own history.
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify requesting user is allowed to view this userId's bookings
    if (req.user) {
      if (req.user.id !== userId) {
        // If IDs don't match, check if target user email matches req.user email
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!targetUser || targetUser.email !== req.user.email) {
          return res.status(403).json({ message: 'Forbidden: You can only access your own booking history.' });
        }
      }
    }

    const user = await prisma.user.findUnique({
      where:   { id: userId },
      include: {
        bookings: {
          include: { lounge: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id:    user.id,
        email: user.email,
        name:  user.name,
        phone: user.phone,
      },
      bookings: user.bookings,
    });
  } catch (err) {
    console.error('getUserBookings error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createUser, getUserBookings };
