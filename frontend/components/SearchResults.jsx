// import {useNavigate, useLocation} from 'react-router-dom'
// import { useEffect, useState } from 'react';

// export default function SearchResults() {

//     const navigate = useNavigate();
//     const location = useLocation();

//     const [source, setSource] = useState(location.state.source);
//     const [destination, setDestination] = useState(location.state.destination);
//     const date = location.state.date;
//     const [planeType, setPlaneType] = useState('');
//     const [numberOfTravellers, setNumberOfTravellers] = useState(location.state.numberOfTravellers);
//     const [results, setResults] = useState([]);
    
//     let airlines = []
//     useEffect(()=>{

//         async function fetchSourcesList() {
//         const token = localStorage.getItem('token');

//         const airline = planeType;

//         await fetch(`http://localhost:3000/searchResults?airline='${airline}'`, { method:'post',headers: {
//             'Content-Type': 'application/json',
//             'authorization' : `Bearer ${token}`
//             },
//             body: JSON.stringify({source, destination, date, numberOfTravellers})
//             }).then(response => {
//                 // Check the status code
//                 console.log('Status Code:', response.status); // Log the status code
            
//                 if(response.ok) {
//                     // If the response is ok (status is in the range 200-299),
//                     // parse the JSON from the response
//                     return response.json();
//                 } else {
//                     // If the response is not ok, throw an error with the status
//                     throw new Error(`Request failed with status ${response.status}`);
//                 }
//             })
//             .then(data => {
//                 // 'data' is the parsed JSON object from the response body
//                 // Access the 'token' property from the data
//                 console.log('recieved data', data); // Log the token or do something with it
//                 setResults(data.results);

//                 airlines.push([...new Set(data.results.map(result => result.Airline_Name))])

//                 console.log(airlines[0]);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });

//         }

//         fetchSourcesList();
//     }, [source, destination, date, planeType])

//     const handleSubmit = (e) => {
        
//             // Prevent the browser from reloading the page
//             e.preventDefault();
        
//             // Read the form data
//             const form = e.target;
//             const formData = new FormData(form);
//             const formJson = Object.fromEntries(formData.entries());
//             // You can pass formData as a fetch body directly:
//             setPlaneType(formJson.myRadio);
            
//     }

//     return(
//         <>
//         <div>
//             <form action="" onSubmit={handleSubmit}>
//                 <h3>your preferred airlines: </h3>
//                 {airlines[0].length > 0 && airlines[0].map((airline, index) => (
//                     <div key={index}>
//                         <label>
//                             <input type="radio" name="myRadio" value="option3" />
//                             {airline}
//                         </label>
//                     </div>
//                 ))}
//                 <button type="submit">Submit</button>
//             </form>
//         </div>

//         <div>
            
//             {
//                 results.length > 0 &&

//                 results.map((result, index) => (
//                 <div key={index}>
//                     <h3>{'AE08'+result.Flight_Id}</h3>
//                     <p>{source}</p>
//                     <p>{result.Departure_Date_Time.substring(11, 19)}</p>
//                     <p>{destination}</p>
//                     <p>{result.Arrival_Date_Time.substring(11, 19)}</p>
//                     <p>{result.Airplane_Type}</p>
//                     <p>{result.Cost}</p>
//                 </div>))
                
//             }
//             {
//                 results.length === 0 && <h1>No results found</h1>
//             }
//         </div>
//         </>
//     )
// }

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchResults() {
    const navigate = useNavigate();
    const location = useLocation();

    const [source, setSource] = useState(location.state.source);
    const [destination, setDestination] = useState(location.state.destination);
    const date = location.state.date;
    const [planeType, setPlaneType] = useState();
    const [numberOfTravellers, setNumberOfTravellers] = useState(location.state.numberOfTravellers);
    const [results, setResults] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [change, setChange] = useState(true);

    useEffect(() => {
        async function fetchSourcesList() {
            const token = localStorage.getItem('token');
            const airline = planeType;
            const response = await fetch(`http://localhost:3000/searchResults?airline=${airline}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ source, destination, date, numberOfTravellers }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
                const uniqueAirlines = [...new Set(data.results.map(result => result.Airplane_Type))];
                if (change) 
                { 
                    setAirlines(uniqueAirlines);
                    setChange(false);
                }
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        }

        fetchSourcesList();
    }, [source, destination, date, planeType, numberOfTravellers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setPlaneType(formData.get('myRadio'));
    };

    return (
        <div>
            <div className="navbar bg-purple-700">
                  <div className="flex-1">
                    <a className="btn btn-ghost text-2xl text">AirLine Reservation System</a>
                  </div>
                  <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                      <li onClick={() => navigate('/profile')} className="text-white text-1xl"><a>Profile</a></li>
                      <li onClick={() => navigate('/tickets')} className="text-white text-1xl">
                        <a>Your Tickets</a>
                      </li>
                    </ul>
                  </div>
            </div>

            <div className='flex flex-row mt-8'>
                <div className='w-300'>
                    <h2 className="text-2xl text-white">Filters</h2>
                    <form onSubmit={handleSubmit} className='text-white text-xl'>
                        <h3 >Your preferred airlines:</h3>
                        {airlines.length > 0 && airlines.map((airline, index) => (
                            <div key={index} className='mt-3'>
                                <label>
                                    <input type="radio" name="myRadio" value={airline} />
                                    {airline}
                                </label>
                            </div>
                        ))}
                        <button type="submit" className="btn btn-active btn-primary mt-3">Search</button>
                    </form>
                </div>

                <div className='border-l-8 border-indigo-500 ml-3'></div>

                <div className='ml-10'>
                    {results.length > 0 ? results.map((result, index) => (
                        // <div key={index}>
                        //     <h3>{'AE08' + result.Flight_Id}</h3>
                        //     <p>{source}</p>
                        //     <p>{result.Departure_Date_Time.substring(11, 19)}</p>
                        //     <p>{destination}</p>
                        //     <p>{result.Arrival_Date_Time.substring(11, 19)}</p>
                        //     <p>{result.Airplane_Type}</p>
                        //     <p>{result.Cost}</p>
                        //     <button type="button" onClick={()=>{navigate('/bookSeats', {state: {source, destination, date, numberOfTravellers, Flight_Id: result.Flight_Id}})}}>Book Seats</button>
                        // </div>
                        <div className="navbar bg-purple-700 mb-12 rounded-lg h-32" key={index}>
                            <div className="text-xl text-white pr-5 mr-4">{'AE08' + result.Flight_Id}</div>
                            <div className='text-xl flex-col text-white pr-5 mr-4'>
                                <div>{source}</div>
                                <div>{'Dept date time: ' +date+' ' +result.Departure_Date_Time.substring(11, 19)}</div>
                            </div>
                            <div className='text-xl flex-col text-white pr-5 mr-4'>
                                <div>{destination}</div>
                                <div>{'Arrival date time: ' +date+' ' +result.Arrival_Date_Time.substring(11, 19)}</div>
                            </div>
                            <div className='text-xl flex-col pr-5 mr-4 text-white'>
                                <div>{result.Airplane_Type}</div>
                                <div>{'Rupees '+result.Cost}</div>
                            </div>
                            <button type="button" onClick={()=>{navigate('/bookSeats', {state: {source, destination, date, numberOfTravellers, Flight_Id: result.Flight_Id}})}} className="btn btn-active btn-primary">Book Seats</button>
                        </div>
                    )) : <h1>No results found</h1>}
                </div>
            </div>
        </div>
    );
}
