const xlsx = require('xlsx');
const path = require('path');

function inspectFile(filePath) {
  console.log(`\nInspecting: ${path.basename(filePath)}`);
  const workbook = xlsx.readFile(filePath);
  
  let totalRows = 0;
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // get sheet range
    const range = xlsx.utils.decode_range(sheet['!ref'] || 'A1:A1');
    const rowsInSheet = range.e.r - range.s.r;
    
    // read first row to get column headers
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 0 });
    const headers = data.length > 0 ? data[0] : [];
    
    console.log(`- Sheet "${sheetName}": ${rowsInSheet} rows, Columns: ${headers.slice(0, 5).join(', ')}...`);
    totalRows += rowsInSheet;
  });
  
  console.log(`Total Rows across all sheets: ${totalRows}`);
}

const fileOld = path.join(__dirname, 'B2B price june 26.xlsx');
const fileNew = path.join(__dirname, 'final_lounges.xlsx');

inspectFile(fileOld);
inspectFile(fileNew);
