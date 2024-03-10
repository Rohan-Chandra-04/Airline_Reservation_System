const createServiceOfferingTableQuery = `
CREATE TABLE Service_Offering (
    Travel_Class_Id INT,
    Service_Id INT,
    PRIMARY KEY (Travel_Class_Id, Service_Id),
    FOREIGN KEY (Travel_Class_Id) REFERENCES Travel_Class(Travel_Class_Id),
    FOREIGN KEY (Service_Id) REFERENCES Flight_Service(Service_Id)
);
`;

connection.query(createServiceOfferingTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Service_Offering table created successfully');
});

const serviceOfferings = [
  // Assuming Service_Id 1 is for 'In-flight Entertainment' as an example
  { Travel_Class_Id: 1, Service_Id: 3 }, 
  { Travel_Class_Id: 1, Service_Id: 4 },
  { Travel_Class_Id: 1, Service_Id: 5 },
  { Travel_Class_Id: 2, Service_Id: 1 },
  { Travel_Class_Id: 2, Service_Id: 2 },
  { Travel_Class_Id: 2, Service_Id: 6 },
  { Travel_Class_Id: 3, Service_Id: 3 },
  { Travel_Class_Id: 3, Service_Id: 4 },
  { Travel_Class_Id: 3, Service_Id: 6 },
  { Travel_Class_Id: 4, Service_Id: 8 },
  { Travel_Class_Id: 4, Service_Id: 9 },
  { Travel_Class_Id: 5, Service_Id: 10 },
  { Travel_Class_Id: 5, Service_Id: 7 },
  // Add more mappings as needed
];

serviceOfferings.forEach((offering) => {
  const insertQuery = 'INSERT INTO Service_Offering (Travel_Class_Id, Service_Id) VALUES (?, ?)';
  connection.query(insertQuery, [offering.Travel_Class_Id, offering.Service_Id], (error, results) => {
    if (error) throw error;
    console.log(`Service offering for Travel_Class_Id ${offering.Travel_Class_Id} and Service_Id ${offering.Service_Id} added successfully`);
  });
});