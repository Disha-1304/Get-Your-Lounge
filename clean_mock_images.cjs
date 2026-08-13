const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const sourceBaseDir = path.join(__dirname, 'lounge_images', 'lounges');
const globalLoungesPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticLoungesPath = path.join(__dirname, 'src', 'data', 'loungesData.json');
const fileNew = path.join(__dirname, 'final_lounges.xlsx');

const globalLounges = JSON.parse(fs.readFileSync(globalLoungesPath, 'utf8'));
const localData = JSON.parse(fs.readFileSync(domesticLoungesPath, 'utf8'));
const domesticLounges = localData.LOUNGE_GUIDES;

const workbook = xlsx.readFile(fileNew);
const newLoungesRaw = xlsx.utils.sheet_to_json(workbook.Sheets['Verified Lounges']);

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

let clearedImages = 0;
let updatedImages = 0;

function cleanAndMapLounges(loungesArray) {
  const filteredLounges = [];
  loungesArray.forEach(l => {
    // Clear all existing mock images first
    l.image = "";
    l.heroImage = "";
    l.images = [];
    l.terminalImage = "";
    l.virtualTour = [];
    
    // Now try to assign actual images from final_lounges matching
    const key = normalize(l.airportCode) + '|' + normalize(l.outletName);
    const uid = newMap.get(key);
    
    let hasRealImages = false;
    if (uid) {
      const sourceFolder = path.join(sourceBaseDir, uid);
      if (fs.existsSync(sourceFolder)) {
        const files = fs.readdirSync(sourceFolder);
        const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'));
        
        if (imageFiles.length > 0) {
          const newImagePaths = [];
          imageFiles.forEach(file => {
            newImagePaths.push(`/assets/lounges/${uid}/${file}`);
          });
          
          l.images = newImagePaths;
          // Use the first image provided as the cover photo
          l.image = newImagePaths[0];
          l.heroImage = newImagePaths[0];
          
          hasRealImages = true;
          updatedImages++;
        }
      }
    }
    
    if (hasRealImages) {
      filteredLounges.push(l);
    } else {
      clearedImages++;
    }
  });
  return filteredLounges;
}

console.log('Cleaning Global Lounges...');
const newGlobalLounges = cleanAndMapLounges(globalLounges);

console.log('Cleaning Domestic/Local Lounges...');
const newDomesticLounges = cleanAndMapLounges(domesticLounges);

fs.writeFileSync(globalLoungesPath, JSON.stringify(newGlobalLounges, null, 2));

localData.LOUNGE_GUIDES = newDomesticLounges;
fs.writeFileSync(domesticLoungesPath, JSON.stringify(localData, null, 2));

console.log(`Successfully assigned real images to ${updatedImages} lounges.`);
console.log(`Cleared mock images from ${clearedImages} lounges.`);
