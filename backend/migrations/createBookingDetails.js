connection.query(`create table Booking_Details(Booking_Id INT AUTO_INCREMENT PRIMARY KEY,
    Seat_Id INT NOT NULL,
    Booking_Date DATE NOT NULL,
    Traveller_Id INT NOT NULL,
    constraint fk_Seat_Id foreign key(Seat_Id) references Seat_Details(Seat_Id),
    constraint fk_Traveller_Id foreign key(Traveller_Id) references Traveller_Details(Traveller_Id))`, (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Booking_Details table created successfully');
    });