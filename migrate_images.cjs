const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Paths
const sourceBaseDir = path.join(__dirname, 'lounge_images', 'lounges');
const destBaseDir = path.join(__dirname, 'public', 'assets', 'lounges');
const globalLoungesPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticLoungesPath = path.join(__dirname, 'src', 'data', 'loungesData.json');
const fileNew = path.join(__dirname, 'final_lounges.xlsx');

// Clean and create destination base
if (fs.existsSync(destBaseDir)) {
  fs.rmSync(destBaseDir, { recursive: true, force: true });
}
fs.mkdirSync(destBaseDir, { recursive: true });

// 1. Load Data
const globalLounges = JSON.parse(fs.readFileSync(globalLoungesPath, 'utf8'));
const localData = JSON.parse(fs.readFileSync(domesticLoungesPath, 'utf8'));
const domesticLounges = localData.LOUNGE_GUIDES;

const workbook = xlsx.readFile(fileNew);
const newLoungesRaw = xlsx.utils.sheet_to_json(workbook.Sheets['Verified Lounges']);

// 2. Mapping
const normalize = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

const newMap = new Map();
newLoungesRaw.forEach(row => {
  const iata = row['IATA'];
  const name = row['Outlet Name'];
  const uid = row['Lounge UID'];
  if (uid && name) {
    const key = normalize(iata) + '|' + normalize(name);
    newMap.set(key, uid);
  }
});

// Helper for migrating images
let totalImagesCopied = 0;
let totalLoungesUpdated = 0;

function processLounges(loungesArray) {
  loungesArray.forEach(l => {
    const key = normalize(l.airportCode) + '|' + normalize(l.outletName);
    const uid = newMap.get(key);
    
    if (uid) {
      const sourceFolder = path.join(sourceBaseDir, uid);
      if (fs.existsSync(sourceFolder)) {
        const files = fs.readdirSync(sourceFolder);
        // filter only images
        const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'));
        
        if (imageFiles.length > 0) {
          const destFolder = path.join(destBaseDir, uid);
          if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder, { recursive: true });
          }
          
          const newImagePaths = [];
          
          imageFiles.forEach(file => {
            const srcFile = path.join(sourceFolder, file);
            const destFile = path.join(destFolder, file);
            fs.copyFileSync(srcFile, destFile);
            newImagePaths.push(`/assets/lounges/${uid}/${file}`);
            totalImagesCopied++;
          });
          
          l.images = newImagePaths;
          l.image = newImagePaths[0] || '';
          l.heroImage = newImagePaths[0] || '';
          totalLoungesUpdated++;
        }
      }
    }
  });
}

// 3. Process
console.log('Processing Global Lounges...');
processLounges(globalLounges);

console.log('Processing Domestic/Local Lounges...');
processLounges(domesticLounges);

// 4. Save JSONs
fs.writeFileSync(globalLoungesPath, JSON.stringify(globalLounges, null, 2));

// For localData, we need to keep other keys intact (like CURRENCIES)
localData.LOUNGE_GUIDES = domesticLounges;
fs.writeFileSync(domesticLoungesPath, JSON.stringify(localData, null, 2));

console.log('================ SUMMARY ================');
console.log(`Lounges successfully matched and updated: ${totalLoungesUpdated}`);
console.log(`Total valid images copied safely: ${totalImagesCopied}`);
console.log('Done!');
