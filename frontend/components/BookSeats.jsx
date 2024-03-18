
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function BookSeats() {

//     const navigate = useNavigate();
//     const location = useLocation();

//     const [source, setSource] = useState(location.state.source);
//     const [destination, setDestination] = useState(location.state.destination);
//     const date = location.state.date;
//     const numberOfTravellers = location.state.numberOfTravellers;
//     const Flight_Id = location.state.Flight_Id;
//     const [seats, setSeats] = useState([]);
//     const [selectedSeats, setSelectedSeats] = useState();
//     const [colors, setColors] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:3000/bookSeats', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ Flight_Id, date }),
//             });
//             const data = await response.json();
//             console.log(data);
//             setSeats(data.results);
//             for (let i = 0; i < data.results.length; i++) {
//                 setColors([...colors, 'green']);
//             }
//         }
//         fetchData();
//     }, [source])

//     async function seatSelect(Seat_Id){

//         if (!(selectedSeats.includes(Seat_Id)))
//         {
//             setSelectedSeats([...selectedSeats, Seat_Id])
//             setColors(colors.map((color, index)=>{
//                 if (index==Seat_Id)
//                 {
//                     return 'blue'
//                 }
//                 else
//                 {
//                     return color
//                 }
//             }))
//             alert('seat is selected')
//         }
//         else
//         {
//             setSelectedSeats(selectedSeats.filter((seat)=>seat!=Seat_Id))
//             setColors(colors.map((color, index)=>{
//                 if (index==Seat_Id)
//                 {
//                     return 'green'
//                 }
//                 else
//                 {
//                     return color
//                 }
//             }))
//             alert('seat is deselected')
//         }
//     }

//     return(
//         <div>
//             {
//                 seats.length>0 ? seats.map((seat, index)=>{
//                     seat.Booked==1?
//                     <div onClick={seatSelect(seat.Seat_Id)}>
//                         <img src="/airplane.png" alt="not loading" style={{height:40, width:30, color:colors[Seat_Id]}}/>
//                     </div>:
//                     <div onClick={()=>{alert('this seat is already booked')}}>
//                         <img src="/airplane.png" alt="not loading" style={{height:40, width:30, color:'red'}}/>
//                     </div>
//                 }):<h1>No seats</h1>
//             }
            
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BookSeats() {
    const navigate = useNavigate();
    const location = useLocation();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [colors, setColors] = useState(new Map());
    const [openForm, setOpenForm] = useState(false);
    const source = location.state.source;
    const destination = location.state.destination;
    const date = location.state.date;
    const Flight_Id = location.state.Flight_Id;
    const [travellerIds, setTravellerIds] = useState([])

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/bookSeats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ Flight_Id: location.state.Flight_Id, date: location.state.date }),
            });
            const data = await response.json();
            setSeats(data.results);
            const newColors = new Map();
            data.results.forEach(seat => {
            newColors.set(seat.Seat_Id, 'green');
            });
            setColors(newColors);
        }
        fetchData();
    }, [location.state.source]);

    async function seatSelect(Seat_Id) {
        const isSeatSelected = selectedSeats.includes(Seat_Id);
        setSelectedSeats(prev => isSeatSelected ? prev.filter(seat => seat !== (Seat_Id)) : [...prev, (Seat_Id)]);
        //setColors(colors => colors.map((color, index) => index === Seat_Id ? (isSeatSelected ? 'green' : 'blue') : color));
        setColors(colors => new Map(colors.set(Seat_Id, isSeatSelected ? 'green' : 'blue')));
        alert(`seat is ${isSeatSelected ? 'deselected' : 'selected'}`);
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        const token = localStorage.getItem('token');
        // You can pass formData as a fetch body directly:
        await fetch('http://localhost:3000/addTravellers', { method:'post',headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formJson), }).then(response => {
              
              console.log('Status Code:', response.status); // Log the status code
          
              if(response.ok) {
                alert('Traveller added successfully')
                  return response.json();
                  
              } else {
                  throw new Error(`Request failed with status ${response.status}`);
              }
          })
          .then(data => {
            const obj = data.results
            console.log(obj.insertId)
            setTravellerIds(travellerIds => [...travellerIds, obj.insertId])
          })
          .catch(error => {
              console.error('Error:', error);
          });
      }

      async function clickContinue() {
        if (selectedSeats.length > 0) {
            console.log('working ..')
            setOpenForm(true);
        } else {
            alert('Please select a seat');
        }
      }

    return (
        <div className='flex flex-col'>
            <div className='text-5xl text-center bg-purple-700 text-white pt-10 pb-10'>Book your Seats: </div>
            
            <div className='grid grid-cols-5 gap-4 mt-8 place-content-around'>
            {seats.length > 0 ? seats.map((seat, index) => (
                <div key={index} onClick={() => seat.Booked !== 1 && seatSelect(seat.Seat_Id)} className='w-16 h-16'>
                    <img src="/airplane.png" alt="seat" style={{height: 40, width: 30, backgroundColor: seat.Booked === 1 ? 'red' : colors.get(seat.Seat_Id)}}/>
                </div>
            )) : <h1>No seats</h1>
            
            }
            </div>

            <button type="button" onClick={clickContinue} className="btn btn-active btn-primary mt-8 w-48">Continue</button>
            {
                openForm ? selectedSeats.map((seat, index) => (
                <form method="post" onSubmit={handleSubmit} key={seat} className='flex flex-col text-white'>
                    <label htmlFor="" className='mt-6'>
                        Seat_Id: {seat}
                    </label>
                    <label className='mt-6'>
                        Passenger Name: <input name="T_Name" type="text" />
                    </label>
                    <label className='mt-6'>
                        Passenger age: <input name="T_Age" type="text" />
                    </label>
                    <label className='mt-6 mb-6'>
                        Passenger Email: <input name="T_Email" type="email" placeholder="enter valid email address"/>
                    </label>

                    <button type="submit" className="btn btn-active btn-primary w-32">Submit</button>
                </form>
                )):null
            }
            <button type="button" onClick={()=>{navigate('/paymentPage', {state: {selectedSeats, date, travellerIds, source, destination, Flight_Id}})}} className="btn btn-active btn-primary mt-8 w-48">Payment Page</button>
        </div>
    );
}
