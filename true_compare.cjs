const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// 1. Load OLD Data from JSON (1086 lounges)
const globalLoungesPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticLoungesPath = path.join(__dirname, 'src', 'data', 'loungesData.json');

const globalLounges = JSON.parse(fs.readFileSync(globalLoungesPath, 'utf8'));
const localData = JSON.parse(fs.readFileSync(domesticLoungesPath, 'utf8'));
const domesticLounges = localData.LOUNGE_GUIDES;

const oldLounges = [...globalLounges, ...domesticLounges];

let oldStats = { total: oldLounges.length, domestic: 0, international: 0, rail: 0 };
oldLounges.forEach(l => {
  if (l.isTrainLounge) oldStats.rail++;
  else if (l.country === 'India') oldStats.domestic++;
  else oldStats.international++;
});

// 2. Load NEW Data from final_lounges.xlsx
const fileNew = path.join(__dirname, 'final_lounges.xlsx');
const workbook = xlsx.readFile(fileNew);
const newLoungesRaw = xlsx.utils.sheet_to_json(workbook.Sheets['Verified Lounges']);

// 3. Compare and Match
// We will match by IATA + Name to find the difference
const normalize = (str) => (str || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

const oldMap = new Map();
oldLounges.forEach(l => {
  const key = normalize(l.airportCode) + '|' + normalize(l.outletName);
  oldMap.set(key, l);
});

const newMap = new Map();
let newStats = { total: newLoungesRaw.length, domestic: 0, international: 0, rail: 0, unknown: 0 };

newLoungesRaw.forEach(row => {
  const iata = row['IATA'];
  const name = row['Outlet Name'];
  const key = normalize(iata) + '|' + normalize(name);
  newMap.set(key, row);
  
  // Try to find it in old map to get category
  const matchedOld = oldMap.get(key);
  if (matchedOld) {
    if (matchedOld.isTrainLounge) newStats.rail++;
    else if (matchedOld.country === 'India') newStats.domestic++;
    else newStats.international++;
  } else {
    // If not in old map, we can guess by name
    if (normalize(name).includes('rail') || normalize(name).includes('irctc')) newStats.rail++;
    else newStats.unknown++;
  }
});

// Calculate differences
const missingInNew = [];
oldLounges.forEach(l => {
  const key = normalize(l.airportCode) + '|' + normalize(l.outletName);
  if (!newMap.has(key)) {
    missingInNew.push(l);
  }
});

const addedInNew = [];
newLoungesRaw.forEach(row => {
  const key = normalize(row['IATA']) + '|' + normalize(row['Outlet Name']);
  if (!oldMap.has(key)) {
    addedInNew.push(row);
  }
});

console.log("================ TRUE COMPARISON SUMMARY ================");
console.log(`\t\tPurana Data\tNayi Excel\tDifference`);
console.log(`Total:\t\t${oldStats.total}\t\t${newStats.total}\t\t${newStats.total - oldStats.total}`);
console.log(`International:\t${oldStats.international}\t\t${newStats.international}\t\t${newStats.international - oldStats.international}`);
console.log(`Domestic:\t${oldStats.domestic}\t\t${newStats.domestic}\t\t${newStats.domestic - oldStats.domestic}`);
console.log(`Rail:\t\t${oldStats.rail}\t\t${newStats.rail}\t\t${newStats.rail - oldStats.rail}`);
if (newStats.unknown > 0) console.log(`Unknown (New):\t0\t\t${newStats.unknown}\t\t+${newStats.unknown}`);

console.log(`\nMissing in Nayi Excel (Removed): ${missingInNew.length}`);
console.log(`Added in Nayi Excel (Brand New): ${addedInNew.length}`);

if (addedInNew.length > 0) {
  console.log("\nSome Newly Added Lounges:");
  addedInNew.slice(0, 5).forEach(l => console.log(` - ${l['Outlet Name']} (${l['IATA']})`));
}
