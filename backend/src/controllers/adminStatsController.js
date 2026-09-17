const prisma = require('../config/prisma');

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const [
      totalLounges,
      activeLounges,
      totalBookings,
      bookingsByStatus,
      revenue,
      recentBookings,
    ] = await Promise.all([
      // Total lounges
      prisma.lounge.count(),

      // Active lounges
      prisma.lounge.count({ where: { isActive: true } }),

      // Total bookings
      prisma.booking.count(),

      // Bookings grouped by status
      prisma.booking.groupBy({
        by:      ['status'],
        _count:  { id: true },
      }),

      // Revenue: sum of totalPrice for CONFIRMED + COMPLETED bookings
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: {
          status: { in: ['CONFIRMED', 'COMPLETED'] },
        },
      }),

      // Last 5 bookings
      prisma.booking.findMany({
        take:    5,
        orderBy: { createdAt: 'desc' },
        include: {
          lounge: { select: { name: true, airportCode: true } },
          user:   { select: { email: true, name: true } },
        },
      }),
    ]);

    // Reshape groupBy result into a clean object
    const statusCounts = { PENDING: 0, CONFIRMED: 0, CANCELLED: 0, COMPLETED: 0 };
    bookingsByStatus.forEach(row => {
      statusCounts[row.status] = row._count.id;
    });

    res.json({
      lounges: {
        total:  totalLounges,
        active: activeLounges,
      },
      bookings: {
        total:    totalBookings,
        byStatus: statusCounts,
      },
      revenue: {
        total:    parseFloat((revenue._sum.totalPrice || 0).toFixed(2)),
        currency: 'USD',
      },
      recentBookings,
    });
  } catch (err) {
    console.error('admin getStats error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getStats };
