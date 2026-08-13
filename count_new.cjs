const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'final_lounges.xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets['Verified Lounges'];
const data = xlsx.utils.sheet_to_json(sheet);

let domestic = 0;
let international = 0;
let rail = 0;

data.forEach(row => {
  const country = (row['Country'] || '').toString().trim().toUpperCase();
  const category = (row['Category'] || row['Type'] || '').toString().trim().toUpperCase();
  const name = (row['Outlet Name'] || row['Lounge Name'] || '').toString().trim().toUpperCase();
  
  const isRail = category.includes('RAIL') || name.includes('RAILWAY') || name.includes('IRCTC');
  
  if (isRail) {
    rail++;
  } else if (country === 'INDIA') {
    domestic++;
  } else if (country && country !== 'INDIA') {
    international++;
  } else {
    international++; // default to international if country missing and not rail/india
  }
});

console.log(`Final Lounges Total: ${data.length}`);
console.log(`International: ${international}`);
console.log(`Domestic: ${domestic}`);
console.log(`Rail: ${rail}`);
