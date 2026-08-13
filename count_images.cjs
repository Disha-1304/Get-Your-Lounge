const fs = require('fs');
const path = require('path');

const loungesDir = path.join(__dirname, 'public', 'assets', 'lounges');
let totalImages = 0;
let totalFoldersWithImages = 0;

if (fs.existsSync(loungesDir)) {
  const folders = fs.readdirSync(loungesDir);
  folders.forEach(folder => {
    const folderPath = path.join(loungesDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);
      const images = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
      if (images.length > 0) {
        totalFoldersWithImages++;
        totalImages += images.length;
      }
    }
  });
}

console.log(`Total images present in public/assets/lounges: ${totalImages}`);
console.log(`Total lounges (folders) with images: ${totalFoldersWithImages}`);

// Let's also check the JSON for any mock images
const globalJsonPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticJsonPath = path.join(__dirname, 'src', 'data', 'loungesData.json');
const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const domesticJsonFull = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8'));
const domesticJson = domesticJsonFull.LOUNGE_GUIDES;

const allLounges = [...globalJson, ...domesticJson];
let mockImagesCount = 0;
let realImagesCountFromJSON = 0;

allLounges.forEach(l => {
  if (l.image && l.image.includes('unsplash')) mockImagesCount++;
  else if (l.image) realImagesCountFromJSON++;
  
  if (l.images && l.images.some(img => img.includes('unsplash'))) mockImagesCount++;
});

console.log(`Mock/Unsplash images found in JSON: ${mockImagesCount}`);
console.log(`Lounges with real images in JSON: ${realImagesCountFromJSON}`);
