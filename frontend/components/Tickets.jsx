import {useNavigate, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Tickets() {

    const navigate = useNavigate();
    const location = useLocation();
    const [tickets, setTickets] = useState([]);
    const [dont, setDont] = useState(false);
    // const source = location.state.source;
    // const destination = location.state.destination;
    // const Flight_Id = location.state.Flight_Id;

    useEffect(()=>{
        async function fetchTickets(){
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/getTickets', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);

                const uniqueByContent = (arr) => {
                    const seen = new Set();
                    return arr.filter(item => {
                      const serializedItem = JSON.stringify(item);
                      if (seen.has(serializedItem)) {
                        return false;
                      }
                      seen.add(serializedItem);
                      return true;
                    });
                  };
                  
                  const filteredTickets = uniqueByContent(data.results);
                
                
                setTickets(filteredTickets);
            }
            else{
                console.log('error');
            }
        }
        fetchTickets();
    }, [dont])

    return(
        <div>
            <div className="navbar bg-purple-700">
                  <div className="flex-1">
                    <a className="btn btn-ghost text-3xl text">AirLine Reservation System</a>
                  </div>
                  <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                      <li onClick={() => navigate('/profile')} className="text-white text-2xl"><a>Profile</a></li>
                      <li onClick={() => navigate('/home')} className="text-white text-2xl">
                        <a>Go to home</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='flex flex-col mt-4 justify-center items-center'>
                    {tickets.length>0? tickets.map((ticket, index) => {
                         return(
                              <div key={index} className='mb-2 w-96 bg-purple-700 rounded-lg'>
                                   {/* <div className='mb-2 text-white text-2xl'>{'Source: '+source}</div>
                                   <div className='mb-2 text-white text-2xl'>{'Destination: '+destination}</div>
                                   <div className='mb-2 text-white text-2xl'>{'Flight No: A308'+Flight_Id}</div> */}
                                   <div className='mb-2 text-white text-2xl'>{'Passenger Name: '+ticket.Traveller_Name}</div>
                                   <div className='mb-2 text-white text-2xl'>{'Passenger Age: '+ticket.Traveller_Age}</div>
                                   <div className='mb-2 text-white text-2xl'>{'Passenger Email: '+ticket.Traveller_Email}</div>
                                   <div className='mb-2 text-white text-2xl'>{'Seat ID: '+ticket.Seat_Id}</div>
                              </div>
                         )
                    }
                    ): <h1>No tickets</h1>}
                </div>
        </div>
    )
}