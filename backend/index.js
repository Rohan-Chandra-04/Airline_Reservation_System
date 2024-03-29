import express from "express";
import mysql from "mysql";
import cors from "cors";
import {z} from "zod";
import jwt from "jsonwebtoken";

import {middleware} from "./authMiddleware.js";
import { passengerInput } from "./zodSchemas/passengerInput.js";
import { passengerLoginInput} from "./zodSchemas/passengerloginInput.js";


import('dotenv').then(dotenv => dotenv.config());


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

// Your code here

const secret = process.env.JWT_SECRET;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ID,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB:', err);
    return;
  }
  console.log('Connected to the database.');
});



app.post("/passengerSignup", async (req, res) => {
  const formData = req.body;

  console.log('req reco');

  if (passengerInput.safeParse(formData).success === false) {
    res.status(400).send("invalid input");
    return;
  }

  console.log(formData);

  const passengerExists = `select P_Email from Passenger where P_Email = ?`;
  connection.query(passengerExists, [formData.P_Email], (error, results, fields) => {
    if (error) {
        console.log(error);
    }
    console.log(results);
    if (results.length > 0) {
        return res.status(409).json({data: "user already exists" });
    }
    else{
      const insertPassengers = `
    INSERT INTO Passenger (P_FirstName, P_LastName, P_Email, P_Password,
       P_PhoneNumber, P_Address, P_City, P_State, P_Zipcode, P_Country) VALUES
     ('${formData.P_FirstName}', '${formData.P_LastName}', '${formData.P_Email}',
      '${formData.P_Password}', '${formData.P_PhoneNumber}', '${formData.P_Address}',
     '${formData.P_City}', '${formData.P_State}', '${formData.P_Zipcode}', '${formData.P_Country}');
    `;
    
    connection.query(insertPassengers, (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log(`${results.affectedRows} passengers inserted.`);
    });

  
    const token = jwt.sign({ email: formData.P_Email, password: formData.P_Password }, secret);

    console.log(token);

    return res.status(201).json({data: token});
    }

    });
});


app.post('/passengerLogin', async (req, res) => {
  const formData = req.body;
  console.log(formData);

  if (passengerLoginInput.safeParse(formData).success === false) {
    return res.status(400).send("invalid input");
  }
  else{
    const passengerExists = `select P_Email, P_Password from Passenger 
    where P_Email = '${formData.P_Email}' and P_Password = '${formData.P_Password}'`;
    connection.query(passengerExists, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results);
        if (results.length === 0) {
            return res.status(401).json({data: "user does not exist" });
        }
        else{
          const token = jwt.sign({ email: formData.P_Email, password: formData.P_Password }, secret);
          return res.status(200).json({data: token});
        }
    });
  }
});

app.get('/passengerDetails', middleware, async (req, res) => {

  const email = req.email;

  const passengerDetails = `select * from Passenger where P_Email = '${email}'`;

  connection.query(passengerDetails, (error, results, fields) => {
    if (error) {
        console.log(error);
    }
    console.log(results);
    if (results.length === 0) {
        return res.status(404).json({data: "user does not exist" });
    }
    else{
      return res.status(200).json({ results});
    }
  })

});

app.post('/passengerEdit', middleware, async (req, res) => {

  const email = req.email;
  const updatedPassword = req.body.P_Password;

  console.log(updatedPassword);

  
  const passengerEdit = `update Passenger set P_Password = '${updatedPassword}'
   where P_Email = '${email}'`;
  connection.query(passengerEdit, (error, results, fields) => {
    if (error) {
        console.log(error);
        return res.status(400).json({data: "password not updated" });
    }
    console.log(results);
    return res.status(200).json({data: "password updated" });
  });
    
});



app.post('/addAirport', async (req, res) => {
  const formData = req.body;
  console.log(formData);
  const insertAirport = `
  INSERT INTO Airport (AirportName, AirportCity, AirportCountry) VALUES
   ('${formData.AirportName}', '${formData.AirportCity}', '${formData.AirportCountry}');
  `;
  
  connection.query(insertAirport, (error, results, fields) => {
    if (error) {
      return res.status(400).json({data: "airport not added" });
    }
    console.log(`${results.affectedRows} airports inserted.`);
    return res.status(201).json({data: "airport added"});
  });
})

app.get('/sourcesList', middleware, (req, res)=>{

  connection.query(`select AirportName, AirportCity, Airport_Id from Airport`, (error, results)=>{
    if (error) {
      return res.status(401).json({msg: 'failed to fetch'})
    }
    return res.status(201).json({results})
  })
})

app.post('/searchResults', middleware, (req, res) => {
  const { source, destination, date } = req.body;
  const airline = req.query.airline; // Accessing airline from query parameters

  console.log(source, destination, date, airline);

  const [sourceAirportName, sourceAirportCity] = source.split(', ');
  const [destinationAirportName, destinationAirportCity] = destination.split(', ');

  // Base query
  let query = `SELECT DISTINCT (f.Flight_Id), Departure_Date_Time,
    Arrival_Date_Time, Airplane_Type, fc.Cost
    FROM Flight_Details AS f
    INNER JOIN Seat_Details AS s ON s.Flight_Id = f.Flight_Id
    INNER JOIN Flight_Cost AS fc ON fc.Seat_Id = s.Seat_Id
    WHERE Source_Airport_Id = (SELECT Airport_Id FROM Airport WHERE AirportCity = ? AND AirportName = ?)
    AND Destination_Airport_Id = (SELECT Airport_Id FROM Airport WHERE AirportCity = ? AND AirportName = ?)
    AND DATE(Departure_Date_Time) = ?`;

  let queryParams = [sourceAirportCity, sourceAirportName, destinationAirportCity,
     destinationAirportName, date];

  //If airline is specified in the query parameters, add it to the query
  if (airline !== "undefined") {
    query += " AND Airplane_Type = ?";
    queryParams.push(airline);
    console.log('Airline specified:', airline);
  }

  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Failed to fetch data' });
    }
    console.log(results);
    return res.status(201).json({ results });
  });
});

app.post('/bookSeats', middleware, (req, res) => {

  const Flight_Id = req.body.Flight_Id;
  const date = req.body.date;

  connection.query(`SELECT 
  Seat_Id, 
  CASE
      WHEN EXISTS (
          SELECT 1 FROM Booking_Details 
          WHERE Booking_Details.Seat_Id = Seat_Details.Seat_Id 
          AND Booking_Date = ?
      ) THEN 1
      ELSE 0
  END
  as Booked
FROM Seat_Details 
WHERE Flight_Id = ?;`, [date, Flight_Id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Failed to fetch data' });
    }
    console.log(results);
    return res.status(201).json({ results });
  }
  )
})

app.post('/addTravellers', middleware, (req, res) => {
  const userEmail = req.email;
  const formData = req.body;

  connection.query(`select Passenger_Id from Passenger 
  where P_Email = '${userEmail}'`, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Failed to fetch data' });
    }
    else{
      console.log(results);
      formData.Passenger_Id = results[0].Passenger_Id;

      connection.query(`insert into Traveller_Details
       (Traveller_Name, Traveller_Age, Traveller_Email, Passenger_Id) values
      ('${formData.T_Name}', '${formData.T_Age}', '${formData.T_Email}',
       '${formData.Passenger_Id}')`, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(403).json({ msg: 'Failed to add traveller' });
      }
        console.log(results);
        return res.status(201).json({results});
      })
    }
  })
  
})

app.post('/getClassAndCost', middleware, (req, res) => {
  const seats = req.body.selectedSeats;

  for (let i = 0; i < seats.length; i++) {
    connection.query(`SELECT 
    Seat_Details.Seat_Id, 
    Flight_Cost.Cost,
    Travel_Class.Travel_Class_Name,
    Flight_Service.Service_Name,
    Flight_Service.Service_Cost
    FROM Flight_Cost 
    INNER JOIN Seat_Details ON Flight_Cost.Seat_Id = Seat_Details.Seat_Id
    inner join Travel_Class on Seat_Details.Travel_Class_Id = Travel_Class.Travel_Class_Id
    inner join Service_Offering on Travel_Class.Travel_Class_Id = Service_Offering.Travel_Class_Id
    inner join Flight_Service on Service_Offering.Service_Id = Flight_Service.Service_Id
    WHERE Seat_Details.Seat_Id = ?;`, [seats[i]], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(403).json({ msg: 'Failed to fetch data' });
      }
      console.log(results);
      return res.status(201).json({ results });
    }
    )
  }
})

app.post('/addBooking', middleware, (req, res) => {
  const fromData = req.body.queryDate;

  console.log(fromData);

  for (let i=0; i<fromData.selectedSeats.length; i++){

    connection.query(`insert into Booking_Details (Booking_Date, Seat_Id, Traveller_Id) values
    ('${fromData.date}', '${fromData.selectedSeats[i]}', '${fromData.travellerIds[i]}')`,
     (error, results) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Failed to add booking' });
    }
      console.log(results);
      return res.status(201).json({ msg: 'Booking added successfully' });
    })
  }
})

app.get('/getTickets', middleware, (req, res) => {
  const userEmail = req.email;

  connection.query(`select Passenger_Id from Passenger where 
  P_Email = '${userEmail}'`, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ msg: 'Failed to fetch data' });
    }
    else{
      console.log(results);
      const Passenger_Id = results[0].Passenger_Id;

      connection.query(`select Booking_Id, Traveller_Name, Traveller_Age,
       Traveller_Email, Seat_Id, Booking_Date from Passenger inner join 
       Traveller_Details on '${Passenger_Id}'=Traveller_Details.Passenger_Id inner join
      Booking_Details on Booking_Details.Traveller_Id=Traveller_Details.Traveller_Id;`,
       (error, results) => {
      if (error) {
        console.error(error);
        return res.status(403).json({ msg: 'Failed to retrieve tickets' });
      }
        console.log(results);
        return res.status(201).json({results});
      })
    }
  })
})
  
app.post('/getBookings', (req, res)=>{
  const formData = req.body;
  console.log(formData)
  const queryDate = formData.queryDate;
  console.log(queryDate)

  connection.query(`select b.Seat_Id, b.Booking_Date, t.Travel_Class_Name, p.Traveller_Name from
   Booking_Details b inner join Seat_Details s on s.Seat_Id=b.Seat_Id inner join 
   Travel_Class t on t.Travel_Class_Id=s.Travel_Class_Id inner join
   Traveller_Details p on p.Traveller_Id=b.Traveller_Id where b.Booking_Date='${queryDate}'`,
    (error, results)=>{
      if (error){
        console.error(error);
        return res.status(403).json({ msg: 'Failed to retrieve tickets' });
      }

      console.log(results);
        return res.status(201).json({results});
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
