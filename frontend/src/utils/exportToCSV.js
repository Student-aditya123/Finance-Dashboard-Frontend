/**
 * Utility function to convert an array of objects to CSV format and download it.
 * @param {Array<Object>} data - An array of objects to export.
 * @param {string} filename - The desired name of the CSV file.
 */
export default function exportToCSV(data, filename = 'export.csv') {
    if (!data || !data.length) {
      console.error('No data to export.');
      return;
    }
  
    // 1. Get headers (the keys of the first object)
    const headers = Object.keys(data[0]);
  
    // 2. Map headers to a comma-separated string
    const csvHeaderRow = headers.join(',') + '\n';
  
    // 3. Map each data row to a comma-separated string, escaping commas/quotes
    const csvDataRows = data.map(row => {
      return headers.map(header => {
        let field = row[header] === null ? '' : row[header].toString();
        // Escape double quotes and commas
        if (field.includes(',') || field.includes('"')) {
          field = `"${field.replace(/"/g, '""')}"`; 
        }
        return field;
      }).join(',');
    }).join('\n');
  
    // 4. Combine headers and rows
    const csvContent = csvHeaderRow + csvDataRows;
  
    // 5. Create a Blob with CSV content type
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // 6. Create a link element, set its href to the blob, and simulate a click
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('CSV Download is not supported by your browser.');
    }
  }