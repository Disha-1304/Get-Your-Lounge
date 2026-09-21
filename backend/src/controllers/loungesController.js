const prisma = require('../config/prisma');

// ─── GET /api/lounges ────────────────────────────────────────────────────────
// Optional ?search= filters by city, airportCode, or name (case-insensitive)
// Without search, returns first 50 active lounges
const getAllLounges = async (req, res) => {
  try {
    const { search } = req.query;

    const where = { isActive: true };

    if (search) {
      const q = search.trim();
      where.OR = [
        { city:        { contains: q, mode: 'insensitive' } },
        { airportCode: { contains: q, mode: 'insensitive' } },
        { name:        { contains: q, mode: 'insensitive' } },
      ];
    }

    const lounges = await prisma.lounge.findMany({
      where,
      take:    50,
      orderBy: { name: 'asc' },
      select: {
        id:           true,
        legacyId:     true,
        name:         true,
        description:  true,
        airportCode:  true,
        city:         true,
        country:      true,
        terminal:     true,
        type:         true,
        amenities:    true,
        images:       true,
        price:        true,
        currency:     true,
        capacity:     true,
        isActive:     true,
        rating:       true,
        reviewsCount: true,
        region:       true,
        airportName:  true,
      },
    });

    // Shape response to match old JSON format so frontend doesn't break
    const shaped = lounges.map(shapeLoungeResponse);
    res.json(shaped);
  } catch (err) {
    console.error('getAllLounges error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message, stack: err.stack });
  }
};

// ─── GET /api/lounges/:id ────────────────────────────────────────────────────
// Accepts either Prisma cuid (id) or the original JSON id (legacyId)
const getLoungeById = async (req, res) => {
  try {
    const { id } = req.params;

    const lounge = await prisma.lounge.findFirst({
      where: {
        OR: [
          { id:       id },
          { legacyId: id },
        ],
      },
    });

    if (!lounge) {
      return res.status(404).json({ message: 'Lounge not found' });
    }

    res.json(shapeLoungeResponse(lounge));
  } catch (err) {
    console.error('getLoungeById error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── POST /api/lounges ───────────────────────────────────────────────────────
// Admin: create a new lounge
const createLounge = async (req, res) => {
  try {
    const {
      name, description, airportCode, city, country, terminal,
      type, amenities, images, price, currency, capacity,
    } = req.body;

    if (!name || !airportCode || !city) {
      return res.status(400).json({ message: 'name, airportCode, and city are required' });
    }

    const lounge = await prisma.lounge.create({
      data: {
        name,
        description:  description  || null,
        airportCode,
        city,
        country:      country      || 'Unknown',
        terminal:     terminal     || null,
        type:         type         || 'INTERNATIONAL',
        amenities:    Array.isArray(amenities) ? amenities : [],
        images:       Array.isArray(images)    ? images    : [],
        price:        typeof price === 'number' ? price    : 0,
        currency:     currency     || 'USD',
        capacity:     typeof capacity === 'number' ? capacity : 50,
      },
    });

    res.status(201).json(shapeLoungeResponse(lounge));
  } catch (err) {
    console.error('createLounge error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── PATCH /api/lounges/:id ──────────────────────────────────────────────────
// Admin: update lounge fields (price, capacity, etc.)
const updateLounge = async (req, res) => {
  try {
    const { id } = req.params;

    // Find first by cuid or legacyId
    const existing = await prisma.lounge.findFirst({
      where: { OR: [{ id }, { legacyId: id }] },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Lounge not found' });
    }

    const allowedFields = [
      'name', 'description', 'airportCode', 'city', 'country', 'terminal',
      'type', 'amenities', 'images', 'price', 'currency', 'capacity', 'isActive',
    ];

    // Only pick fields that were actually sent in the body
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    const lounge = await prisma.lounge.update({
      where: { id: existing.id },
      data:  updateData,
    });

    res.json(shapeLoungeResponse(lounge));
  } catch (err) {
    console.error('updateLounge error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

function parseJsonArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch (e) { return []; }
  }
  return [];
}

function shapeLoungeResponse(lounge) {
  const amenitiesList = parseJsonArray(lounge.amenities);
  const imagesList    = parseJsonArray(lounge.images);

  return {
    id:           lounge.legacyId || lounge.id,  // frontend uses the old id
    _dbId:        lounge.id,                      // new Prisma cuid, available if needed
    outletName:   lounge.name,
    name:         lounge.name,
    description:  lounge.description,
    airportCode:  lounge.airportCode,
    city:         lounge.city,
    country:      lounge.country,
    terminal:     lounge.terminal,
    terminals:    lounge.terminal ? [lounge.terminal] : [],
    type:         lounge.type,
    amenities:    amenitiesList,
    images:       imagesList,
    image:        imagesList[0] || null,
    heroImage:    imagesList[0] || null,
    price:        lounge.price,
    priceUSD:     lounge.price,
    currency:     lounge.currency,
    capacity:     lounge.capacity,
    isActive:     lounge.isActive,
    rating:       lounge.rating,
    reviewsCount: lounge.reviewsCount,
    region:       lounge.region,
    airportName:  lounge.airportName,
  };
}

module.exports = { getAllLounges, getLoungeById, createLounge, updateLounge };
