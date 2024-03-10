const insertData = () => {
    let object = [];
  
    for (let flightId = 1; flightId <= 2; flightId++) {
      for (let i = 1; i <= 10; i++) {
        // Randomly generate a Travel_Class_Id between 1 and 5
        const travelClassId = 2;
  
        object.push([travelClassId, flightId]);
      }
      for (let i = 1; i <= 20; i++) {
        // Randomly generate a Travel_Class_Id between 1 and 5
        const travelClassId = 4;
  
        object.push([travelClassId, flightId]);
      }
  
    }
  
    connection.query(`insert into Seat_Details (Travel_Class_Id, Flight_Id) values ?`, [object],(error, results) => {
      if (error) return console.error(error.message);
      console.log('Rows inserted:', results.affectedRows);
    });
  };