import "./styles.css";

document.getElementById("submitButton").addEventListener("click", function() {
  const dropdown1Value = document.getElementById("dropdown1").value;
  const dropdown2Value = document.getElementById("dropdown2").value;
  const label = dropdown1Value + dropdown2Value;

  performExcelLookup(label);
});

function performExcelLookup(label) {
  const excelFilePath = 'lookup.xlsx'; // Update with your actual file path

  const XLSX = require('xlsx');
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
  const worksheet = workbook.Sheets[sheetName];

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  let value = 'Label not found';

  for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 0 })]; // Assuming label is in column A
    if (cell && cell.v === label) {
      const valueCell = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: 1 })]; // Assuming value is in column B
      if (valueCell) {
        value = valueCell.v;
      }
      break;
    }
  }

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Value for label ${label}: ${value}`;
}
