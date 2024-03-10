connection.query(`create table Flight_Stop (Flight_Id int not null, Stop_Airport_Id int not null, Departure_Date_Time datetime not null, foreign key (Flight_Id) references Flight_Details(Flight_Id), foreign key (Stop_Airport_Id) references Airport(Airport_Id))`, (error, results)=>{
    if (error) {
      console.log(error);
    }
    console.log('Flight_Stop table created successfully');
  })