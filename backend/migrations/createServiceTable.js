// const createTableQuery = `
// CREATE TABLE Flight_Service (
//     Service_Id INT AUTO_INCREMENT PRIMARY KEY,
//     Service_Name VARCHAR(255) NOT NULL,
//     Service_Cost INT NOT NULL
// );
// `;

// // Execute the query to create the table
// connection.query(createTableQuery, (error, results) => {
//   if (error) throw error;
//   console.log('Flight_Service table with cost column created successfully');
// });
// Array of services with names and costs to insert into the Flight_Service table
const services = [
    { name: 'In-flight Entertainment', cost: 100 },
    { name: 'Wi-Fi Access', cost: 50 },
    { name: 'Meal Service', cost: 200 },
    { name: 'Beverage Service', cost: 150 },
    { name: 'Priority Boarding', cost: 100 },
    { name: 'Extra Legroom Seats', cost: 300 },
    { name: 'Lounge Access', cost: 500 },
    { name: 'Fast Track Security', cost: 100 },
    { name: 'Onboard Shopping', cost: 100 },
    { name: 'Special Assistance Services', cost: 200 }
  ];
  
  // Insert service names and costs into the Flight_Service table
  services.forEach((service) => {
    const insertQuery = 'INSERT INTO Flight_Service (Service_Name, Service_Cost) VALUES (?, ?)';
    connection.query(insertQuery, [service.name, service.cost], (error, results) => {
      if (error) throw error;
      console.log(`Service '${service.name}' with cost ${service.cost} added successfully`);
    });
  
  });