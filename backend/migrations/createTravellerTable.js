connection.query(`create table Traveller_Details(Traveller_Id INT AUTO_INCREMENT PRIMARY KEY,
    Traveller_Name VARCHAR(255) NOT NULL,
    Traveller_Age INT NOT NULL,
    Traveller_Email VARCHAR(255) NOT NULL,
    Passenger_Id INT NOT NULL,
    constraint fk_Passenger_Id foreign key(Passenger_Id) references Passenger(Passenger_Id))`, (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Traveller_Details table created successfully');
    });