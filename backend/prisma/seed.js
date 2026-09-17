/**
 * Seed script — reads both JSON files and inserts lounges into PostgreSQL via Prisma.
 *
 * Run with: node prisma/seed.js
 *
 * Field mapping decisions:
 *  - terminals[] (array)  → terminal (String): first element taken
 *  - type "Indian Airport Lounge" → inferred from terminal string (Domestic/International)
 *  - priceUSD             → price (Float), currency = "USD"
 *  - priceINR             → DROPPED (derived value)
 *  - capacity             → defaulted to 50 (missing in JSON)
 *  - isActive             → defaulted to true (missing in JSON)
 *  - rating, reviewsCount → stored as-is (added optional fields to schema)
 *  - status, statusColor  → DROPPED
 *  - heroImage, image     → DROPPED (already in images[])
 *  - region               → stored as-is (optional field)
 *  - isTrainLounge, isIndianAirportLounge, terminalImage, virtualTour, tier, gateType → DROPPED
 *  - outletId (global)    → DROPPED (redundant with legacyId)
 *  - airportName (global) → stored as-is (optional field)
 */

const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Infer LoungeType from the terminal string.
 * "Domestic" → DOMESTIC, everything else → INTERNATIONAL
 */
function inferType(terminalStr = '') {
  return terminalStr.toLowerCase().includes('domestic') ? 'DOMESTIC' : 'INTERNATIONAL';
}

/**
 * Normalise an image array: remove empty strings, deduplicate.
 */
function cleanImages(images = [], singleImage = '') {
  const all = [...images];
  if (singleImage && !all.includes(singleImage)) all.unshift(singleImage);
  return [...new Set(all.filter(Boolean))];
}

/**
 * Map a raw JSON record (from either file) to a Prisma Lounge create payload.
 */
function mapRecord(raw) {
  const terminalStr = Array.isArray(raw.terminals) ? raw.terminals[0] || '' : '';

  // Strip "lounge-" prefix from global data ids
  const legacyId = String(raw.id || '').replace(/^lounge-/, '') || null;

  return {
    legacyId,
    name:         raw.outletName || 'Unnamed Lounge',
    description:  raw.description || null,
    airportCode:  raw.airportCode || '',
    city:         raw.city || 'Unknown',
    country:      raw.country || 'Unknown',
    terminal:     terminalStr || null,
    type:         inferType(terminalStr),
    amenities:    JSON.stringify(Array.isArray(raw.amenities) ? raw.amenities.filter(Boolean) : []),
    images:       JSON.stringify(cleanImages(raw.images, raw.image)),
    price:        typeof raw.priceUSD === 'number' ? raw.priceUSD : 0,
    currency:     'USD',
    capacity:     50,
    isActive:     true,
    // Optional informational fields
    rating:       typeof raw.rating === 'number' ? raw.rating : null,
    reviewsCount: typeof raw.reviewsCount === 'number' ? raw.reviewsCount : null,
    region:       raw.region || null,
    airportName:  raw.airportName || null,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const dataDir = path.join(__dirname, '..', 'src', 'data');

  console.log('📖  Reading JSON files…');
  const loungesDataRaw = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'loungesData.json'), 'utf-8')
  );
  const globalDataRaw = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'globalLoungesData.json'), 'utf-8')
  );

  // loungesData.json has a LOUNGE_GUIDES array at the top level
  const localRecords  = Array.isArray(loungesDataRaw.LOUNGE_GUIDES) ? loungesDataRaw.LOUNGE_GUIDES : [];
  const globalRecords = Array.isArray(globalDataRaw) ? globalDataRaw : [];

  console.log(`   Local  lounges : ${localRecords.length}`);
  console.log(`   Global lounges : ${globalRecords.length}`);

  const allRecords = [...localRecords, ...globalRecords];

  // Map + flag issues
  const flagged = [];
  const mapped  = allRecords.map((raw, idx) => {
    const record = mapRecord(raw);

    // Flag records missing key data
    if (!record.airportCode) flagged.push({ idx, id: raw.id, issue: 'missing airportCode' });
    if (record.price === 0)  flagged.push({ idx, id: raw.id, issue: 'price defaulted to 0 (no priceUSD)' });
    if (!record.country || record.country === 'Unknown')
      flagged.push({ idx, id: raw.id, issue: 'missing country → defaulted to "Unknown"' });

    return record;
  });

  // Remove records with no legacyId (can't ensure uniqueness)
  const validRecords   = mapped.filter(r => r.legacyId);
  const invalidRecords = mapped.filter(r => !r.legacyId);
  if (invalidRecords.length) {
    console.warn(`⚠️   ${invalidRecords.length} records skipped — missing id field`);
  }

  console.log('\n🌱  Seeding database…');
  let inserted = 0;
  let skipped  = 0;

  for (const record of validRecords) {
    try {
      await prisma.lounge.upsert({
        where: { legacyId: record.legacyId },
        update: record,
        create: record,
      });
      inserted++;
    } catch (e) {
      skipped++;
    }
  }

  console.log(`\n\n✅  Done!`);
  console.log(`   Inserted : ${inserted}`);
  console.log(`   Skipped  : ${skipped} (already existed)`);

  if (flagged.length) {
    console.log(`\n⚠️   Flagged records (${flagged.length}):`);
    // Print first 20 flags to avoid flooding the terminal
    flagged.slice(0, 20).forEach(f =>
      console.log(`   [${f.idx}] id=${f.id}  →  ${f.issue}`)
    );
    if (flagged.length > 20) {
      console.log(`   … and ${flagged.length - 20} more. Use PATCH /api/lounges/:id to fix prices.`);
    }
  }
}

main()
  .catch(e => { console.error('Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
