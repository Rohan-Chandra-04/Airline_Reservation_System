
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedSeats = location.state.selectedSeats;
    const [services, setServices] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [text, setText] = useState('Add');

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
        }
        fetchClassAndCost();
    })

    async function toggle(serviceCost){
        if (text === 'Add'){
            setTotalCost(totalCost + serviceCost);
            setText('Remove')
        }
        else{
            setTotalCost(totalCost - serviceCost);
            setText('Add')
        }
    }
    return (
        <div>
            {
                services.map((service, index) => {
                    
                    return (
                        <div key={index}>
                            <p>seat_id: {service.Seat_Id}</p>
                            <p>service name: {service.Service_Name}</p>
                            <p>service cost: {service.Service_Cost}</p>
                            <button type="button" onClick={toggle(service.Service_Cost)} style={{color:(text==='Add')?'green':'red'}}>{text}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}