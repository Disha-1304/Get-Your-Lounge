const xlsx = require('xlsx');
const path = require('path');

const b2bPath = path.join(__dirname, 'B2B price june 26.xlsx');
const workbook = xlsx.readFile(b2bPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

console.log("Sheet name:", sheetName);
console.log("Headers:");
console.log(data[0]);
console.log("First row:");
console.log(data[1]);
