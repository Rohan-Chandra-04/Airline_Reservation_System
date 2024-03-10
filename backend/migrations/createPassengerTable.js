function createPassengerTable(connection){
     const createPassengerTable = `
 create table Passenger
 (
  Passenger_ID INT NOT NULL,
  P_FirstName VARCHAR(100),
  P_LastName VARCHAR(100),
  P_Email VARCHAR(100),
  P_PhoneNumber BIGINT NOT NULL UNIQUE,
  P_Address VARCHAR(100),
  P_City VARCHAR(100),
  P_State VARCHAR(100),
  P_Zipcode VARCHAR(5),
  P_Country VARCHAR(100),
  PRIMARY KEY (Passenger_ID)
 );`;

connection.query(createPassengerTable, (error, results, fields) => {
  if (error) throw error;
  console.log("Users table created or already exists.");
});
}

function alterPassengerTable(connection){
     const alterTable = `
 ALTER TABLE Passenger
 ADD P_Password VARCHAR(100) NOT NULL;
 `;

connection.query(alterTable, (error, results, fields) => {
  if (error) throw error;
  console.log("Password column added to Passenger table.");
});
}

export { createPassengerTable, alterPassengerTable };