
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedSeats = location.state.selectedSeats;
    const travellerIds = location.state.travellerIds;
    const date = location.state.date;
    const [services, setServices] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [text, setText] = useState([]);

    const source = location.state.source;
    const destination = location.state.destination;
    const Flight_Id = location.state.Flight_Id;

    useEffect(() => {
        async function fetchClassAndCost(){

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/getClassAndCost', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ selectedSeats }),
            });
        
            const data = await response.json();
            console.log(data);
            setServices(data.results);
            if (data.results.length > 0){
                const ticketCost = data.results[0].Cost;
                console.log(ticketCost);
                setTotalCost(ticketCost*(selectedSeats.length));
            }
            const settingArray = [];
            for (let i = 0; i < data.results.length; i++)
                settingArray.push('Add');

            setText(settingArray);
        }
        fetchClassAndCost();
    }, [selectedSeats])

    function toggle(serviceCost, index){
        if (text[index] === 'Add'){
            setTotalCost(totalCost + serviceCost);
            setText(text.map((t, i)=>{
                if (i===index){
                    return 'Remove'
                }
                else{
                    return t
                }
            }))
        }
        else{
            setTotalCost(totalCost - serviceCost);
            setText(text.map((t, i)=>{
                if (i===index){
                    return 'Add'
                }
                else{
                    return t
                }
            }))
        }
    }

    async function addBooking(){
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/addBooking', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ selectedSeats, travellerIds, date }),
        });

        if (response.ok){
            const data = await response.json();
            alert('Bookings added successfully')
            console.log(data);
            navigate('/tickets', {state: {source, destination, Flight_Id, date}});
        }
        else{
            alert('Failed to add bookings')
        }
    }
    return (
        <div>
            <div className="bg-purple-700 text-white text-center text-5xl pt-8 pb-8">Payment Page</div>
            {
                services.map((service, index) => {
                    
                    return (
                        <div key={index} className="flex flex-col justify-center mt-4">
                            <p className="text-2xl text-white mt-2">seat_id: {service.Seat_Id}</p>
                            <p className="text-2xl text-white mt-2">service name: {service.Service_Name}</p>
                            <p className="text-2xl text-white mt-2 mb-2">service cost: {service.Service_Cost}</p>
                            <button type="button" onClick={()=>toggle(service.Service_Cost, index)} style={{height: '40px', width:'80px', backgroundColor:(text[index]==='Add')?'green':'red', color: 'white'}}>{text[index]}</button>
                        </div>
                        
                    )
                })
                
            }
            <div className="text-white text-center mt-8 text-4xl">Payment: Rupees {totalCost}</div>
            <div className="flex flex-row justify-center ">
                <button onClick={addBooking} className="btn btn-active btn-primary mt-8 w-48">Pay and Book</button>
            </div>
        </div>
    )
}