function insertAirportTable(connection){
    const insertAirports = `
  INSERT INTO Airport (Airport_ID, AirportName, AirportCity, AirportCountry) VALUES
  (1, 'Los Angeles International Airport', 'Los Angeles', 'USA'),
  (2, 'Heathrow Airport', 'London', 'United Kingdom'),
  (3, 'Beijing Capital International Airport', 'Beijing', 'China'),
  (4, 'Charles de Gaulle Airport', 'Paris', 'France'),
  (5, 'Tokyo Haneda Airport', 'Tokyo', 'Japan'),
  (6, 'Dubai International Airport', 'Dubai', 'United Arab Emirates'),
  (7, 'Frankfurt Airport', 'Frankfurt', 'Germany'),
  (8, 'Sydney Kingsford Smith Airport', 'Sydney', 'Australia'),
  (9, 'Toronto Pearson International Airport', 'Toronto', 'Canada'),
  (10, 'São Paulo-Guarulhos International Airport', 'São Paulo', 'Brazil')
`;

connection.query(insertAirports, (error, results, fields) => {
  if (error) throw error;
  console.log(`${results.affectedRows} airports inserted.`);
});
}

export { insertAirportTable };