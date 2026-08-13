const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const b2bPath = path.join(__dirname, 'B2B price june 26.xlsx');
const workbook = xlsx.readFile(b2bPath);

const globalSheet = workbook.Sheets['Global Lounge '];
const domesticSheet = workbook.Sheets['Domestic Lounge '];
const trainSheet = workbook.Sheets['Railway Lounges'];

const globalB2B = xlsx.utils.sheet_to_json(globalSheet, { header: 1 });
const domesticB2B = xlsx.utils.sheet_to_json(domesticSheet, { header: 1 });

const globalJsonPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticJsonPath = path.join(__dirname, 'src', 'data', 'loungesData.json');

const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const domesticJson = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8')).LOUNGE_GUIDES;

const normalize = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

const jsonNames = new Set([
  ...globalJson.map(l => normalize(l.outletName)),
  ...domesticJson.map(l => normalize(l.outletName))
]);

console.log("Global JSON count:", globalJson.length);
console.log("Domestic JSON count:", domesticJson.length);

let missingCount = 0;
// Note: Usually the first row is header, but we need to find which row has actual data.
// Let's print the first few rows of Global Lounge sheet.
console.log("Global B2B Rows 0-5:");
globalB2B.slice(0, 5).forEach(row => console.log(row));

console.log("Domestic B2B Rows 0-5:");
domesticB2B.slice(0, 5).forEach(row => console.log(row));
