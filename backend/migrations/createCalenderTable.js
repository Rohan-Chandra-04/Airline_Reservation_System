function createCalenderTable(connection) {
  const createTableSql = `
    CREATE TABLE Calendar
    (
      Day_Date Date NOT NULL,
      Business_Day_YN CHAR(1) CONSTRAINT check_character_Business_Day_YN CHECK(Business_Day_YN IN ('Y', 'N')),
      CONSTRAINT Calendar_PK PRIMARY KEY (Day_Date)
    );`;

  // Execute the SQL statement to create the table
  connection.query(createTableSql, (err, result) => {
    if (err) throw err;
    console.log("Table created.");
  });
}

function insertCalender(connection) {
  const insertSql =
    "INSERT INTO Calendar (Day_Date, Business_Day_YN) VALUES ('2024-01-01', 'Y');";

  // Execute the SQL statement to insert data
  connection.query(insertSql, (err, result) => {
    if (err) throw err;
    console.log("Data inserted.");
  });
}

export { createCalenderTable, insertCalender };
