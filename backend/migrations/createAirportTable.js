function createAirportTable(connection){
    const createAirlineTable = `
CREATE TABLE Airport
(
Airport_ID int not null,
AirportName varchar(100),
AirportCity varchar(100),
AirportCountry varchar(100),
CONSTRAINT Airport_PK PRIMARY KEY (Airport_ID)
)`;

connection.query(createAirlineTable, (error, results, fields) => {
  if (error) throw error;
  console.log("Users table created or already exists.");
});
}

const insertAirportsQuery = `
  INSERT INTO Airport (AirportName, AirportCity, AirportCountry) VALUES
  ('Indira Gandhi International Airport', 'New Delhi', 'India'),
  ('Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', 'India'),
  ('Kempegowda International Airport', 'Bangalore', 'India'),
  ('Chennai International Airport', 'Chennai', 'India'),
  ('Netaji Subhas Chandra Bose International Airport', 'Kolkata', 'India'),
  ('Rajiv Gandhi International Airport', 'Hyderabad', 'India'),
  ('Cochin International Airport', 'Kochi', 'India'),
  ('Sardar Vallabhbhai Patel International Airport', 'Ahmedabad', 'India'),
  ('Pune International Airport', 'Pune', 'India'),
  ('Goa International Airport', 'Goa', 'India');
  `;

  connection.query(insertAirportsQuery, (error) => {
    if (error) throw error;
    console.log('Indian airports data inserted successfully');
  });

export { createAirportTable };