

module.exports.parseCSV = (csvData) => {
  // Split the CSV data into an array of rows
  const rows = csvData.split('\n');

  // Extract the header row to get the column names
  const headers = rows[0].split(',');

  // Remove the header row from the array
  rows.shift();

  // Parse the remaining rows into objects
  const animals = rows.map((row) => {

    const values = row.split(',');

    // Create an object with keys from the headers and values from the row
    const animal = {};
    
    for (let i = 0; i < headers.length; i++) {
      animal[headers[i]] = values[i];
    }

    return animal;
  });

  return animals;
}