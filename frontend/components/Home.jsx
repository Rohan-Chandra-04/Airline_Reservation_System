
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();

    const [date, setDate] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [sources, setSources] = useState([])
    const [numberOfTravellers, setNumberOfTravellers] = useState(1)
    const [render, setRender] = useState(false)
    //const [destinations, setDestinations] = useState([])
    //useState [src, setSource] = useState('')

    useEffect(()=>{
    const suggestSources = async ()=>{
        
        const token = localStorage.getItem('token');

        await fetch('http://localhost:3000/sourcesList', { method:'get',headers: {
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${token}`
            },
            }).then(response => {
                // Check the status code
                console.log('Status Code:', response.status); // Log the status code
            
                if(response.ok) {
                    // If the response is ok (status is in the range 200-299),
                    // parse the JSON from the response
                    return response.json();
                } else {
                    // If the response is not ok, throw an error with the status
                    throw new Error(`Request failed with status ${response.status}`);
                }
            })
            .then(data => {
                // 'data' is the parsed JSON object from the response body
                // Access the 'token' property from the data
                
                console.log('recieved data', data); // Log the token or do something with it
                setSources(data.results)
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
        suggestSources()
    },[render])

    async function handleSubmit(e) {

        e.preventDefault();
        //console.log(source, destination, date, numberOfTravellers);

        if (source!==destination)
            navigate('/searchResults', {state: {source, destination, date, numberOfTravellers}});
        else{
            alert('source and destination cannot be same')
            setSource('')
            setDestination('')
        }
    }
    
    return (
        <>
            <div>
                {/* <button onClick={() => navigate('/profile')}>Profile</button> */}

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

                <form action="" onSubmit={handleSubmit} className="flex-col px-80 py-50  h-full mt-40">
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter date: <input id="today" type="date" value={date} onChange={e=>setDate(e.target.value)} minDate={new Date()}/>
                    </label>
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter src: 
                        <div>
                            <input type="search" list="list" autoComplete="on" value={source} onChange={(e)=>setSource(e.target.value)} />
                            <datalist id="list">
                            { sources.map( d => <option key={d.AirportName} value={d.AirportName + ', '+ d.AirportCity} /> )}
                            </datalist>
                        </div>
                    </label>
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter destination: 
                        <div>
                            <input type="search" list="list" autoComplete="on" value={destination} onChange={(e)=>setDestination(e.target.value)} />
                            <datalist id="list">
                            { sources.map( d => <option key = {d.AirportName} value={d.AirportName + ', ' + d.AirportCity} /> )}
                            </datalist>
                        </div>
                    </label>
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        Number of Travellers:
                        <div>
                        <button className="rounded-full bg-purple-700 w-8" type="button" onClick={()=>{if (numberOfTravellers>1) setNumberOfTravellers(numberOfTravellers-1)}}>-</button>
                        <input className="text-center w-8" value={numberOfTravellers} onChange={e=>setNumberOfTravellers(e.target.value)}/>
                        <button className="rounded-full bg-purple-700 w-8" type="button" onClick={()=>{ setNumberOfTravellers(numberOfTravellers+1)}}>+</button>
                        </div>
                    </label>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
            </div>
        </>
    )
}