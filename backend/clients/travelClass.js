function insertTravelClass(connection) {
    const insertSQL = `INSERT INTO Travel_Class (Travel_Class_ID, Travel_Class_Name, Travel_Class_Capacity) VALUES (?, ?, ?);`;
    
    // Data to be inserted
    const travelClasses = [
      [1, 'First Class', 50],
      [2, 'Business Class', 70],
      [3, 'Premium Economy', 100],
      [4, 'Economy Class', 150],
      [5, 'Basic Economy', 200]
    ];
    
    // Insert records
    
    travelClasses.forEach(travelClass => {
      connection.query(insertSQL, travelClass, (err, results) => {
        if (err) throw err;
        console.log(`Record inserted: ${travelClass[1]}`);
      });
    });
    
    }

    export { insertTravelClass};