const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const globalJsonPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticJsonPath = path.join(__dirname, 'src', 'data', 'loungesData.json');

const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const domesticJsonFull = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8'));
const domesticJson = domesticJsonFull.LOUNGE_GUIDES;

const allLounges = [...globalJson, ...domesticJson];

const missingImageLounges = allLounges.filter(l => !l.image || l.image.trim() === '');

const dataForExcel = missingImageLounges.map(l => ({
  'Outlet ID': l.id || l.outletId,
  'Outlet Name': l.outletName,
  'City': l.city,
  'Country': l.country,
  'IATA': l.airportCode,
  'Terminals': l.terminals ? l.terminals.join(', ') : '',
  'Type': l.type,
  'Status': l.status
}));

const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "Missing Images");

const outputPath = path.join(__dirname, 'missing_images_lounges.xlsx');
xlsx.writeFile(workbook, outputPath);

console.log(`Generated excel with ${missingImageLounges.length} missing image lounges at ${outputPath}`);
