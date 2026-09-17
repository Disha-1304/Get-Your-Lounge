const prisma    = require('../config/prisma');
const adminAuth = require('../middleware/adminAuth');

// ─── GET /api/admin/lounges ───────────────────────────────────────────────────
// All lounges (including inactive), paginated
const listLounges = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;
    const search = req.query.search?.trim();

    const where = {};
    if (search) {
      where.OR = [
        { name:        { contains: search, mode: 'insensitive' } },
        { city:        { contains: search, mode: 'insensitive' } },
        { airportCode: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [lounges, total] = await Promise.all([
      prisma.lounge.findMany({
        where,
        skip,
        take:    limit,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { bookings: true } } },
      }),
      prisma.lounge.count({ where }),
    ]);

    res.json({
      data: lounges,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('admin listLounges error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── PATCH /api/admin/lounges/:id ────────────────────────────────────────────
// Edit any lounge field (price, isActive, amenities, name, description, etc.)
const updateLounge = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.lounge.findFirst({
      where: { OR: [{ id }, { legacyId: id }] },
    });
    if (!existing) return res.status(404).json({ message: 'Lounge not found' });

    const EDITABLE = [
      'name', 'description', 'airportCode', 'city', 'country', 'terminal',
      'type', 'amenities', 'images', 'price', 'currency', 'capacity', 'isActive',
      'rating', 'reviewsCount', 'region', 'airportName',
    ];

    const updateData = {};
    EDITABLE.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    const lounge = await prisma.lounge.update({
      where: { id: existing.id },
      data:  updateData,
    });

    res.json(lounge);
  } catch (err) {
    console.error('admin updateLounge error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { listLounges, updateLounge };
