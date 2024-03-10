
function createTravelClass(connection) {
const createTableSQL = `CREATE TABLE Travel_Class
(
  Travel_Class_ID INT NOT NULL,
  Travel_Class_Name VARCHAR(100) CONSTRAINT name_list_chk CHECK (Travel_Class_Name IN('First Class','Business Class','Premium Economy','Economy Class','Basic Economy')),
  Travel_Class_Capacity BIGINT,
  CONSTRAINT Travel_Class_PK PRIMARY KEY (Travel_Class_ID)
);`;

// Execute the table creation query
connection.query(createTableSQL, (err, results) => {
  if (err) throw err;
  console.log('Table Travel_Class created.');
});

}

const dropColumnQuery = `ALTER TABLE Travel_Class DROP COLUMN Travel_Class_Capacity;`;

// Execute the query to drop the column
connection.query(dropColumnQuery, (error, results) => {
  if (error) throw error;
  console.log('Travel_Class_Capacity column dropped successfully from the Travel_Class table');
});

// Example of inserting a record into the Travel_Class table



export  { createTravelClass };