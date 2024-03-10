function insertPassenger(connection, formData){
    const insertPassengers = `
INSERT INTO Passenger (Passenger_ID, P_FirstName, P_LastName, P_Email, P_PhoneNumber, P_Address, P_City, P_State, P_Zipcode, P_Country) VALUES
 ?;
`;

connection.query(insertPassengers, [formData], (error, results, fields) => {
  if (error) {
    throw error;
  }
  console.log(`${results.affectedRows} passengers inserted.`);
});

return true;
}


function passengerExists(connection, email){
    const passengerExists = `select P_Email from Passenger where P_Email = ?`;
    connection.query(passengerExists, [email], (error, results, fields) => {
        if (error) {
            throw error;
        }
        console.log(results);
        if (results.length === 0) {
            return false;
        }
        return true;
    });
}
export { insertPassenger, passengerExists };