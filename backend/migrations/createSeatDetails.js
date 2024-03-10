const createSeatDetailsTableQuery = `
CREATE TABLE Seat_Details (
    Seat_Id INT AUTO_INCREMENT PRIMARY KEY,
    Travel_Class_Id INT,
    Flight_Id INT,
    FOREIGN KEY (Travel_Class_Id) REFERENCES Travel_Class(Travel_Class_Id),
    FOREIGN KEY (Flight_Id) REFERENCES Flight_Details(Flight_Id)
);
`;

connection.query(createSeatDetailsTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Seat_Details table created successfully');
});