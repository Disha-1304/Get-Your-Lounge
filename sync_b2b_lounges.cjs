const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const b2bPath = path.join(__dirname, 'B2B price june 26.xlsx');
const workbookB2B = xlsx.readFile(b2bPath);
const globalB2B = xlsx.utils.sheet_to_json(workbookB2B.Sheets['Global Lounge '], { range: 2 });
const domesticB2B = xlsx.utils.sheet_to_json(workbookB2B.Sheets['Domestic Lounge '], { range: 2 });
const railwayB2B = xlsx.utils.sheet_to_json(workbookB2B.Sheets['Railway Lounges'], { range: 2 });

const imgPath = path.join(__dirname, 'final_lounges.xlsx');
const workbookImg = xlsx.readFile(imgPath);
const imgMapData = xlsx.utils.sheet_to_json(workbookImg.Sheets['Verified Lounges']);
const imageFolder = path.join(__dirname, 'lounge_images', 'lounges');

const globalJsonPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticJsonPath = path.join(__dirname, 'src', 'data', 'loungesData.json');
// Reload original data
const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const domesticJsonFull = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8'));
const domesticJson = domesticJsonFull.LOUNGE_GUIDES;

const normalize = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

const imgUidMap = new Map();
imgMapData.forEach(row => {
  const iata = row['IATA'];
  const name = row['Outlet Name'];
  const uid = row['Lounge UID'];
  if (uid && name) {
    const key = (iata ? normalize(iata) + '|' : '') + normalize(name);
    imgUidMap.set(key, uid);
    // Also store by just name for railway lounges since they don't have IATA
    imgUidMap.set('railway|' + normalize(name), uid);
  }
});

function createLoungeFromB2B(b2bRow, isDomestic, isRailway) {
  let id, city, outletName, country, airportCode, terminals, rating, priceUSD, priceINR, status, type, region, desc;
  
  if (isRailway) {
    id = b2bRow['Outlet Id Long'];
    city = b2bRow['City'] || '';
    outletName = b2bRow['Outlet Name'] || '';
    country = 'India';
    airportCode = '';
    terminals = [(b2bRow['Site Name'] || '') + (b2bRow['Platform'] ? ' - ' + b2bRow['Platform'] : '')];
    rating = 4.0;
    priceINR = 550;
    priceUSD = 550 / 83;
    status = b2bRow['Operational Status'] === 'Operational' ? 'Available' : 'Available';
    type = 'Railway Lounge';
    region = 'Asia';
    desc = 'Premium railway executive lounge.';
  } else {
    id = b2bRow['Outlet ID'];
    city = b2bRow['City'] || '';
    outletName = b2bRow['Outlet Name'] || '';
    country = b2bRow['Country'] || (isDomestic ? 'India' : '');
    airportCode = b2bRow['IATA'] || '';
    terminals = [b2bRow['Terminal'] || ''];
    rating = 4.0;
    priceINR = isDomestic ? parseFloat(b2bRow['Price (INR)'] || 0) : parseFloat(b2bRow['Price (USD)'] || 0) * 83;
    priceUSD = isDomestic ? parseFloat(b2bRow['Price (INR)'] || 0) / 83 : parseFloat(b2bRow['Price (USD)'] || 0);
    status = b2bRow['Operational Status'] === 'Operational' ? 'Available' : 'Available';
    type = isDomestic ? 'Indian Airport Lounge' : 'Global Airport Lounge';
    region = isDomestic ? 'Asia' : 'Global';
    desc = 'Premium airport lounge experience.';
  }

  return {
    id: String(id),
    city,
    outletName,
    country,
    airportCode,
    terminals,
    rating,
    reviewsCount: 10,
    priceUSD,
    priceINR,
    status,
    statusColor: '#10b981',
    description: desc,
    amenities: ['Wi-Fi', 'Refreshments', 'Comfortable Seating'],
    region,
    isTrainLounge: !!isRailway,
    isIndianAirportLounge: !!isDomestic,
    type
  };
}

function syncLounges(b2bData, jsonArray, isDomestic, isRailway) {
  const finalLounges = [];
  const jsonMap = new Map();
  
  // Index existing JSON lounges by ID
  jsonArray.forEach(l => {
    if (l.id) jsonMap.set(String(l.id), l);
    if (l.outletId) jsonMap.set(String(l.outletId), l);
  });

  b2bData.forEach(b2bRow => {
    const id = isRailway ? b2bRow['Outlet Id Long'] : b2bRow['Outlet ID'];
    if (!id) return; // Skip empty rows

    let lounge = jsonMap.get(String(id));
    
    if (!lounge) {
      lounge = createLoungeFromB2B(b2bRow, isDomestic, isRailway);
    }

    // Always clean mock images
    lounge.image = "";
    lounge.heroImage = "";
    lounge.images = [];
    lounge.terminalImage = "";
    lounge.virtualTour = [];

    // Assign actual images if available
    let key;
    if (isRailway) {
      key = 'railway|' + normalize(lounge.outletName);
    } else {
      key = normalize(lounge.airportCode) + '|' + normalize(lounge.outletName);
    }
    
    let uid = imgUidMap.get(key);
    // fallback to just name if not found
    if (!uid) {
      const allKeys = Array.from(imgUidMap.keys());
      const fallbackKey = allKeys.find(k => k.endsWith('|' + normalize(lounge.outletName)));
      if (fallbackKey) uid = imgUidMap.get(fallbackKey);
    }
    
    if (uid) {
      const sourceFolder = path.join(imageFolder, uid);
      if (fs.existsSync(sourceFolder)) {
        const files = fs.readdirSync(sourceFolder);
        const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'));
        
        if (imageFiles.length > 0) {
          const newImagePaths = imageFiles.map(file => `/assets/lounges/${uid}/${file}`);
          lounge.images = newImagePaths;
          lounge.image = newImagePaths[0];
          lounge.heroImage = newImagePaths[0];
        }
      }
    }

    finalLounges.push(lounge);
  });
  return finalLounges;
}

// Reset the original data again from git before processing, so we have all original lounges
const { execSync } = require('child_process');
execSync('git restore src/data/loungesData.json src/data/globalLoungesData.json');
const rawGlobalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const rawDomesticJsonFull = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8'));

const newGlobalLounges = syncLounges(globalB2B, rawGlobalJson, false, false);
const newDomesticLounges = syncLounges(domesticB2B, rawDomesticJsonFull.LOUNGE_GUIDES, true, false);
const newRailwayLounges = syncLounges(railwayB2B, rawDomesticJsonFull.LOUNGE_GUIDES, true, true);

const allDomesticLounges = [...newDomesticLounges, ...newRailwayLounges];

fs.writeFileSync(globalJsonPath, JSON.stringify(newGlobalLounges, null, 2));

rawDomesticJsonFull.LOUNGE_GUIDES = allDomesticLounges;
fs.writeFileSync(domesticJsonPath, JSON.stringify(rawDomesticJsonFull, null, 2));

console.log(`Synced Global Lounges: ${newGlobalLounges.length}`);
console.log(`Synced Domestic Lounges: ${newDomesticLounges.length}`);
console.log(`Synced Railway Lounges: ${newRailwayLounges.length}`);
