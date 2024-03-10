const createFlightDetailsTableQuery = `
  CREATE TABLE Flight_Details (
      Flight_ID INT NOT NULL,
      Source_Airport_ID INT NOT NULL,
      Destination_Airport_ID INT NOT NULL,
      Departure_Date_Time DateTime NOT NULL,
      Arrival_Date_Time DateTime NOT NULL,
      Airplane_Type VARCHAR(100) NOT NULL,
      CONSTRAINT Flight_Details_PK PRIMARY KEY (Flight_ID),
      CONSTRAINT Flight_Details_Source_FK1 FOREIGN KEY (Source_Airport_ID) REFERENCES Airport(Airport_ID),
      CONSTRAINT Flight_Details_Destination_FK2 FOREIGN KEY (Destination_Airport_ID) REFERENCES Airport(Airport_ID)
      
  );
  `;
  
  connection.query(createFlightDetailsTableQuery, (error, results) => {
    if (error) throw error;
    console.log('Flight_Details table created successfully');
  });