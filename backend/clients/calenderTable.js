function insertCalender(connection) {
    const insertSql =
      "INSERT INTO Calendar (Day_Date, Business_Day_YN) VALUES ('2024-01-01', 'Y');";
  
    // Execute the SQL statement to insert data
    connection.query(insertSql, (err, result) => {
      if (err) throw err;
      console.log("Data inserted.");
    });
  }

  connection.query(`insert into Calendar values ('2024-03-15', 'Y')`, (error, results)=>{
    if (error) {
      console.log('error', error);
    }
    console.log('table fligth cost created ....');
  })

  export { insertCalender };