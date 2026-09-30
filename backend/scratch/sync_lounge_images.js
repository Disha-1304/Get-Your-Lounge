const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = path.resolve(__dirname, '..', '..');
const SCRAPER_DIR = 'C:\\Currently workin on FAT\\Scraper';
const PUBLIC_ASSETS = path.join(BASE_DIR, 'lounge pair', 'public', 'assets');

const FRONTEND_GLOBAL = path.join(BASE_DIR, 'lounge pair', 'src', 'data', 'globalLoungesData.json');
const FRONTEND_DOMESTIC = path.join(BASE_DIR, 'lounge pair', 'src', 'data', 'loungesData.json');
const BACKEND_GLOBAL = path.join(BASE_DIR, 'backend', 'src', 'data', 'globalLoungesData.json');
const BACKEND_DOMESTIC = path.join(BASE_DIR, 'backend', 'src', 'data', 'loungesData.json');

function generateUid(str) {
  return crypto.createHash('sha256').update(str).digest('hex').slice(0, 16);
}

const missing207 = JSON.parse(fs.readFileSync(path.join(SCRAPER_DIR, 'missing_207.json'), 'utf8'));

const railwayLounges = [
  { name: 'IRCTC Executive Lounge (Kalupur Railway Station Ahmedabad)', city: 'Ahmedabad' },
  { name: 'Refreshing Lounge (Asansol Junction Railway Station)', city: 'Asansol' },
  { name: 'Beverage Lounge (Asansol Junction Railway Station)', city: 'Asansol' },
  { name: 'Premium Lounge (Asansol Junction Railway Station)', city: 'Asansol' },
  { name: 'Executive Lounge (Chennai Central Railway Station)', city: 'Chennai' },
  { name: 'IRCTC Lounge (Old Delhi Railway Station)', city: 'Delhi' },
  { name: 'Premium Lounge (Durgapur Railway Station)', city: 'Durgapur' },
  { name: 'IRCTC Executive Lounge (Jaipur Railway Station)', city: 'Jaipur' },
  { name: 'IRCTC Executive Lounge (Sealdah Railway Station Kolkata)', city: 'Kolkata' },
  { name: 'IRCTC Executive Lounge (Madurai Railway Station)', city: 'Madurai' },
  { name: 'IRCTC Executive Lounge (New Delhi Railway Station)', city: 'New Delhi' },
  { name: 'IRCTC Executive Lounge (New Delhi Railway Station - Paharganj Side)', city: 'New Delhi' },
  { name: 'IRCTC Executive Lounge (Varanasi Cantt Railway Station)', city: 'Varanasi' }
];

async function main() {
  console.log('--- Step 1: Loading Lounge Data ---');
  const globalLounges = JSON.parse(fs.readFileSync(FRONTEND_GLOBAL, 'utf8'));
  const domesticData = JSON.parse(fs.readFileSync(FRONTEND_DOMESTIC, 'utf8'));
  const domesticLounges = domesticData.LOUNGE_GUIDES;

  console.log(`Global Lounges count: ${globalLounges.length}`);
  console.log(`Domestic Lounges count: ${domesticLounges.length}`);

  // Pool of authentic airport lounge images to use for any fallback
  const fallbackPool = [
    '/assets/lounges/d7a7a83fa90175a6/1.jpg',
    '/assets/lounges/d7a7a83fa90175a6/2.jpg',
    '/assets/lounges/d7a7a83fa90175a6/3.jpg',
    '/assets/lounges/d5d688fd95904ee6/1.jpg',
    '/assets/lounges/d5d688fd95904ee6/2.jpg',
    '/assets/lounges/d5d688fd95904ee6/3.jpg',
    '/assets/lounges/823d63caa127a565/1.jpg',
    '/assets/lounges/823d63caa127a565/2.jpg',
    '/assets/lounges/823d63caa127a565/3.jpg',
    '/assets/lounges/7f0f6376766e3010/1.jpg',
    '/assets/lounges/7f0f6376766e3010/2.jpg',
    '/assets/lounges/7f0f6376766e3010/3.jpg'
  ];

  let fallbackIndex = 0;
  function getFallbackImages() {
    const start = (fallbackIndex * 3) % (fallbackPool.length - 2);
    fallbackIndex++;
    return [fallbackPool[start], fallbackPool[(start + 1) % fallbackPool.length], fallbackPool[(start + 2) % fallbackPool.length]];
  }

  // Helper to ensure images exist on disk and return valid image paths
  function resolveLoungeImages(lounge) {
    const name = (lounge.outletName || lounge.name || '').trim();
    const city = (lounge.city || '').trim();

    // Check if lounge already has valid images on disk
    if (lounge.images && lounge.images.length > 0) {
      const valid = lounge.images.filter(img => {
        const full = path.join(BASE_DIR, 'lounge pair', 'public', img.replace(/^\//, ''));
        return fs.existsSync(full);
      });
      if (valid.length > 0) {
        return {
          images: valid,
          image: valid[0],
          heroImage: valid[0],
          source: 'existing'
        };
      }
    }

    // Try Railway lounges
    const rMatch = railwayLounges.find(r => {
      const rn = r.name.toLowerCase();
      const ln = name.toLowerCase();
      return rn.includes(ln) || ln.includes(r.city.toLowerCase());
    });
    if (rMatch) {
      const uid = generateUid(rMatch.name);
      const folder = path.join(PUBLIC_ASSETS, 'railway_lounges', uid);
      if (fs.existsSync(folder)) {
        const files = fs.readdirSync(folder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
        if (files.length > 0) {
          const imgs = files.map(f => `/assets/railway_lounges/${uid}/${f}`);
          return { images: imgs, image: imgs[0], heroImage: imgs[0], source: 'railway' };
        }
      }
    }

    // Try missing_207
    let mMatch = missing207.find(m => m.name.trim().toLowerCase() === name.toLowerCase());
    if (!mMatch) {
      mMatch = missing207.find(m => {
        const mn = m.name.toLowerCase();
        const ln = name.toLowerCase();
        return mn.includes(ln) || ln.includes(mn);
      });
    }

    if (mMatch) {
      const uid = generateUid(mMatch.name);
      const folder = path.join(PUBLIC_ASSETS, 'missing_lounges', uid);
      if (fs.existsSync(folder)) {
        const files = fs.readdirSync(folder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
        if (files.length > 0) {
          const imgs = files.map(f => `/assets/missing_lounges/${uid}/${f}`);
          return { images: imgs, image: imgs[0], heroImage: imgs[0], source: 'missing_207' };
        }
      }
    }

    // Fallback: assign authentic lounge images and copy into missing_lounges folder
    const uid = generateUid(name);
    const targetFolder = path.join(PUBLIC_ASSETS, 'missing_lounges', uid);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    const sampleImgs = getFallbackImages();
    // Copy the sample image files into targetFolder so physical files exist for this lounge
    sampleImgs.forEach((srcRel, idx) => {
      const srcFile = path.join(BASE_DIR, 'lounge pair', 'public', srcRel.replace(/^\//, ''));
      const destFile = path.join(targetFolder, `${idx + 1}.jpg`);
      if (fs.existsSync(srcFile) && !fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
      }
    });

    const finalFiles = fs.readdirSync(targetFolder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    if (finalFiles.length > 0) {
      const imgs = finalFiles.map(f => `/assets/missing_lounges/${uid}/${f}`);
      return { images: imgs, image: imgs[0], heroImage: imgs[0], source: 'curated_fallback' };
    }

    return { images: sampleImgs, image: sampleImgs[0], heroImage: sampleImgs[0], source: 'pool' };
  }

  console.log('--- Step 2: Updating Global Lounges ---');
  let globalUpdated = 0;
  for (const l of globalLounges) {
    const res = resolveLoungeImages(l);
    l.images = res.images;
    l.image = res.image;
    l.heroImage = res.heroImage;
    if (res.source !== 'existing') globalUpdated++;
  }
  console.log(`Global Lounges updated: ${globalUpdated}`);

  console.log('--- Step 3: Updating Domestic Lounges ---');
  let domesticUpdated = 0;
  for (const l of domesticLounges) {
    const res = resolveLoungeImages(l);
    l.images = res.images;
    l.image = res.image;
    l.heroImage = res.heroImage;
    if (res.source !== 'existing') domesticUpdated++;
  }
  console.log(`Domestic Lounges updated: ${domesticUpdated}`);

  console.log('--- Step 4: Saving Updated JSON Files ---');
  fs.writeFileSync(FRONTEND_GLOBAL, JSON.stringify(globalLounges, null, 2));
  fs.writeFileSync(BACKEND_GLOBAL, JSON.stringify(globalLounges, null, 2));

  domesticData.LOUNGE_GUIDES = domesticLounges;
  fs.writeFileSync(FRONTEND_DOMESTIC, JSON.stringify(domesticData, null, 2));
  fs.writeFileSync(BACKEND_DOMESTIC, JSON.stringify(domesticData, null, 2));
  console.log('Successfully saved JSON files in frontend and backend!');

  console.log('--- Step 5: Creating Lounge-to-Image Manifest ---');
  const manifest = {};
  const allLounges = [...domesticLounges, ...globalLounges];
  for (const l of allLounges) {
    const key = `${l.outletName || l.name} (${l.city || l.airportCode})`;
    manifest[key] = {
      id: l.id || l.outletId,
      name: l.outletName || l.name,
      city: l.city,
      country: l.country,
      airportCode: l.airportCode,
      heroImage: l.heroImage,
      images: l.images
    };
  }
  fs.writeFileSync(path.join(PUBLIC_ASSETS, 'lounge_images_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Manifest created with ${Object.keys(manifest).length} lounges mapped!`);

  console.log('--- Step 6: Updating PostgreSQL Database via Prisma ---');
  const prisma = require('../src/config/prisma');
  try {
    let dbUpdated = 0;
    const dbLounges = await prisma.lounge.findMany({
      select: { id: true, legacyId: true, name: true, city: true, airportCode: true, images: true }
    });

    for (const dbl of dbLounges) {
      // Find matching item in updated data
      const matched = allLounges.find(l => {
        const legacyId = String(l.id || '').replace(/^lounge-/, '');
        if (dbl.legacyId && legacyId === dbl.legacyId) return true;
        if (l.outletId && String(l.outletId) === dbl.legacyId) return true;
        return (l.outletName || l.name) === dbl.name && l.airportCode === dbl.airportCode;
      });

      if (matched && matched.images && matched.images.length > 0) {
        const newImagesStr = JSON.stringify(matched.images);
        if (dbl.images !== newImagesStr) {
          await prisma.lounge.update({
            where: { id: dbl.id },
            data: { images: newImagesStr }
          });
          dbUpdated++;
        }
      }
    }
    console.log(`Database lounges updated: ${dbUpdated}`);
  } catch (err) {
    console.error('Database update error:', err.message);
  } finally {
    await prisma.$disconnect();
  }

  console.log('All image initialization complete!');
}

main().catch(console.error);
