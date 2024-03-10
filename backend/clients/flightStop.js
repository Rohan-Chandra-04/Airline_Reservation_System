connection.query(`insert into Flight_Stop (Flight_Id, Stop_Airport_Id, Departure_Date_Time) values (1, 21, '2024-03-15 16:00:00')`, (error, results)=>{
    if (error) {
      console.log(error);
    }
    console.log('Flight_Stop table created successfully');
  })