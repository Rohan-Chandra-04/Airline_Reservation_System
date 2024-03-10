
connection.query(`insert into Flight_Details values (1, 11, 12, '2024-03-15 14:30:00', '2024-03-15 17:30:00', 'Indigo'), (2, 12, 13, '2024-03-16 14:30:00', '2024-03-16 17:30:00', 'Kingfisher');`, (error, results)=>{
    if (error) throw error;
    console.log('flights inserted')
  })

  connection.query(`insert into Flight_Details values (3, 11, 12, '2024-03-15 9:30:00', '2024-03-15 12:30:00', 'Vistara'), (4, 12, 13, '2024-03-16 9:30:00', '2024-03-16 12:30:00', 'Vistara');`, (error, results)=>{
    if (error) throw error;
    console.log('flights inserted')
  })