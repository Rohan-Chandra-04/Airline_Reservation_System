const insertData = ()=>{

    let object = [];
  
    
      for (let i = 1; i <= 60; i++) {
        // Randomly generate a Travel_Class_Id between 1 and 5
  
        object.push([i, '2024-03-15', 4000]);
      }
      
  
    
  
    connection.query(`insert into Flight_Cost (Seat_Id, B_Date, Cost) values ?`, [object],(error, results) => {
      if (error) return console.error(error.message);
      console.log('Rows inserted:', results.affectedRows);
    });
  
  }
  insertData();