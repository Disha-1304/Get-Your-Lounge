const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return null;
  }

  const workbook = xlsx.readFile(filePath);
  
  let totalCount = 0;
  let domesticCount = 0;
  let internationalCount = 0;
  let railCount = 0;
  
  const lounges = [];

  workbook.SheetNames.forEach(sheetName => {
    if (sheetName.toLowerCase().includes('sheet') && sheetName.length > 7) return;

    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    
    data.forEach(row => {
      const keys = Object.keys(row);
      const nameKey = keys.find(k => k.toLowerCase().includes('lounge name') || k.toLowerCase().includes('outlet') || k.toLowerCase().includes('name'));
      const countryKey = keys.find(k => k.toLowerCase().includes('country'));
      const cityKey = keys.find(k => k.toLowerCase().includes('city'));
      const typeKey = keys.find(k => k.toLowerCase().includes('type') || k.toLowerCase().includes('category'));
      
      const loungeName = nameKey ? String(row[nameKey]).trim() : '';
      const country = countryKey ? String(row[countryKey]).trim() : '';
      const city = cityKey ? String(row[cityKey]).trim() : '';
      const typeStr = typeKey ? String(row[typeKey]).trim() : '';
      
      if (!loungeName || loungeName === '') return;
      
      totalCount++;
      
      let category = 'Unknown';
      const nameUpper = loungeName.toUpperCase();
      const cityUpper = city.toUpperCase();
      const typeUpper = typeStr.toUpperCase();
      
      const isRail = 
        nameUpper.includes('RAIL') || 
        nameUpper.includes('IRCTC') || 
        nameUpper.includes('TRAIN') || 
        nameUpper.includes('STATION') || 
        cityUpper.includes('RAIL') ||
        typeUpper.includes('RAIL') ||
        sheetName.toLowerCase().includes('rail');
        
      if (isRail) {
        railCount++;
        category = 'Rail';
      } else if (country.toUpperCase() === 'INDIA') {
        domesticCount++;
        category = 'Domestic';
      } else if (country && country.toUpperCase() !== 'INDIA') {
        internationalCount++;
        category = 'International';
      } else {
        if (sheetName.toLowerCase().includes('international') || typeUpper.includes('INTERNATIONAL')) {
          internationalCount++;
          category = 'International';
        } else if (sheetName.toLowerCase().includes('domestic') || sheetName.toLowerCase().includes('india') || typeUpper.includes('DOMESTIC')) {
          domesticCount++;
          category = 'Domestic';
        } else {
          if (sheetName === 'Sheet1' || sheetName === 'Domestic') {
             domesticCount++; category = 'Domestic';
          } else {
             internationalCount++; category = 'International';
          }
        }
      }
      
      lounges.push({ name: loungeName, city, country, category, sheet: sheetName });
    });
  });

  return {
    totalCount,
    domesticCount,
    internationalCount,
    railCount,
    lounges
  };
}

const fileOld = path.join(__dirname, 'B2B price june 26.xlsx');
const fileNew = path.join(__dirname, 'final_lounges.xlsx');

const oldData = analyzeFile(fileOld);
const newData = analyzeFile(fileNew);

if (oldData && newData) {
  console.log("================ COMPARISON SUMMARY ================");
  console.log(`\t\tOld Excel\tNew Excel\tDifference`);
  console.log(`Total:\t\t${oldData.totalCount}\t\t${newData.totalCount}\t\t+${newData.totalCount - oldData.totalCount}`);
  console.log(`International:\t${oldData.internationalCount}\t\t${newData.internationalCount}\t\t+${newData.internationalCount - oldData.internationalCount}`);
  console.log(`Domestic:\t${oldData.domesticCount}\t\t${newData.domesticCount}\t\t+${newData.domesticCount - oldData.domesticCount}`);
  console.log(`Rail:\t\t${oldData.railCount}\t\t${newData.railCount}\t\t+${newData.railCount - oldData.railCount}`);
  
  const oldSet = new Set(oldData.lounges.map(l => (l.name + "|" + l.city).toLowerCase()));
  const added = newData.lounges.filter(l => !oldSet.has((l.name + "|" + l.city).toLowerCase()));
  
  console.log(`\nNewly Added Lounges: ${added.length}`);
  if (added.length > 0) {
    console.log("Some examples of newly added lounges:");
    added.slice(0, 10).forEach(l => console.log(` - ${l.name} (${l.city}, ${l.country}) [${l.category}]`));
  }
}
