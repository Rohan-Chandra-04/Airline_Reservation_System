connection.query(`create table Flight_Cost (
    Seat_ID int NOT NULL,
    B_Date Date NOT NULL,
    Cost BIGINT,
    CONSTRAINT Flight_Cost_PK PRIMARY KEY (Seat_ID,B_Date),
   CONSTRAINT Flight_Cost_Seat_ID_FK1 FOREIGN KEY (Seat_ID) REFERENCES Seat_Details(Seat_ID),
   CONSTRAINT Flight_Cost_Valid_From_Date_FK2 FOREIGN KEY (B_Date) REFERENCES Calendar(Day_Date)
   
  );`, (error, results)=>{
    if (error) {
      console.log('error', error);
    }
    console.log('table fligth cost created ....');
  })