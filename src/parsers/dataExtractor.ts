export function extractData(data: any[]) {
  // Implement data extraction logic here
  return data;
}

export function generateCSV(data: any[]): string {
  let csvContent = "column1,column2\n";
  for (const item of data) {
    csvContent += `\t${item.column1},${item.column2}\n`;
  }
  return csvContent;
}
