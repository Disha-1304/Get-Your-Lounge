const XLSX = require('xlsx');
const wb = XLSX.readFile('./B2B price june 26.xlsx');

console.log('=== ALL SHEETS IN EXCEL ===\n');
wb.SheetNames.forEach((name, i) => {
  const ws = wb.Sheets[name];
  const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  // Filter out completely empty rows
  const nonEmpty = rawData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ''));
  console.log(`${i + 1}. "${name}" => Raw rows: ${rawData.length}, Non-empty rows: ${nonEmpty.length}`);
  // Print header row
  if (nonEmpty.length > 0) {
    console.log(`   Header: ${JSON.stringify(nonEmpty[0])}`);
    console.log(`   Row 2 : ${JSON.stringify(nonEmpty[1])}`);
  }
  console.log('');
});

console.log('\n========================================');
console.log('=== DETAILED LOUNGE COUNTS ===');
console.log('========================================\n');

// --- GLOBAL LOUNGE ---
const globalRaw = XLSX.utils.sheet_to_json(wb.Sheets['Global Lounge '], { header: 1 });
// Find header row
let globalHeaderIdx = globalRaw.findIndex(r => r.includes('#') || r.includes('Outlet ID'));
console.log(`Global Lounge: header at row index ${globalHeaderIdx}`);
const globalHeaders = globalRaw[globalHeaderIdx];
console.log('Global headers:', globalHeaders);
const globalRows = globalRaw.slice(globalHeaderIdx + 1).filter(r => r.length > 0 && r[0] !== undefined && r[0] !== '');
console.log(`Global Lounge data rows: ${globalRows.length}`);
// Count unique outlets
const globalOutletIds = new Set();
globalRows.forEach(r => { if (r[1]) globalOutletIds.add(String(r[1])); });
console.log(`Global unique Outlet IDs: ${globalOutletIds.size}`);
// Count unique countries
const globalCountries = new Set();
const countryIdx = globalHeaders.indexOf('Country');
globalRows.forEach(r => { if (r[countryIdx]) globalCountries.add(r[countryIdx]); });
console.log(`Global unique countries: ${globalCountries.size}`);
console.log('Countries:', [...globalCountries].sort().join(', '));
console.log('');

// --- DOMESTIC LOUNGE ---
const domRaw = XLSX.utils.sheet_to_json(wb.Sheets['Domestic Lounge '], { header: 1 });
let domHeaderIdx = domRaw.findIndex(r => r.some(c => c === '#' || c === 'City' || c === 'Outlet ID'));
console.log(`Domestic Lounge: header at row index ${domHeaderIdx}`);
const domHeaders = domRaw[domHeaderIdx];
console.log('Domestic headers:', domHeaders);
const domRows = domRaw.slice(domHeaderIdx + 1).filter(r => r.length > 0 && r[0] !== undefined && r[0] !== '');
console.log(`Domestic Lounge data rows: ${domRows.length}`);
// Unique outlets
const domOutletIds = new Set();
const domOutletIdx = domHeaders.indexOf('Outlet ID');
domRows.forEach(r => { if (r[domOutletIdx]) domOutletIds.add(String(r[domOutletIdx])); });
console.log(`Domestic unique Outlet IDs: ${domOutletIds.size}`);
// Unique cities
const domCities = new Set();
const domCityIdx = domHeaders.indexOf('City');
domRows.forEach(r => { if (r[domCityIdx]) domCities.add(r[domCityIdx]); });
console.log(`Domestic unique cities: ${domCities.size} => ${[...domCities].sort().join(', ')}`);
console.log('');

// --- RAILWAY LOUNGES ---
const railRaw = XLSX.utils.sheet_to_json(wb.Sheets['Railway Lounges'], { header: 1 });
let railHeaderIdx = railRaw.findIndex(r => r.some(c => c === 'City' || c === 'Outlet Id Long' || c === 'Outlet Name'));
console.log(`Railway Lounges: header at row index ${railHeaderIdx}`);
const railHeaders = railRaw[railHeaderIdx];
console.log('Railway headers:', railHeaders);
const railRows = railRaw.slice(railHeaderIdx + 1).filter(r => r.length > 0 && r[0] !== undefined && r[0] !== '');
console.log(`Railway Lounge data rows: ${railRows.length}`);
// Unique cities
const railCities = new Set();
const railCityIdx = railHeaders.indexOf('City');
railRows.forEach(r => { if (r[railCityIdx]) railCities.add(r[railCityIdx]); });
console.log(`Railway unique cities: ${railCities.size} => ${[...railCities].sort().join(', ')}`);
console.log('');

// --- INDIA MEET & ASSIST (check if it has lounges) ---
const meetRaw = XLSX.utils.sheet_to_json(wb.Sheets['India Meet & Assist'], { header: 1 });
let meetHeaderIdx = meetRaw.findIndex(r => r.some(c => c === 'City' || c === '#'));
console.log(`India Meet & Assist: header at row index ${meetHeaderIdx}`);
if (meetHeaderIdx >= 0) {
  const meetHeaders = meetRaw[meetHeaderIdx];
  console.log('Meet & Assist headers:', meetHeaders);
  const meetRows = meetRaw.slice(meetHeaderIdx + 1).filter(r => r.length > 0 && r[0] !== undefined && r[0] !== '');
  console.log(`Meet & Assist data rows: ${meetRows.length}`);
}
console.log('');

console.log('========================================');
console.log('=== FINAL SUMMARY ===');
console.log('========================================');
console.log(`International (Global Lounge):  ${globalRows.length}`);
console.log(`Domestic (India airports):      ${domRows.length}`);
console.log(`Rail / IRCTC Lounges:           ${railRows.length}`);
console.log(`TOTAL:                          ${globalRows.length + domRows.length + railRows.length}`);
