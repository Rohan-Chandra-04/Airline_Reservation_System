
import {useState, useEffect} from 'react'

export default function ViewBookings(){

    const [validData, setValidData] = useState([])
    const [show, setShow] = useState(false)

    async function handleSubmit (e){
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        // You can pass formData as a fetch body directly:
        await fetch('http://localhost:3000/getBookings', { method:'post',headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson), }).then(response => {
                // Check the status code
                console.log('Status Code:', response.status); // Log the status code
            
                if(response.ok) {
                    // If the response is ok (status is in the range 200-299),
                    // parse the JSON from the response
                    return response.json();
                } else {
                    // If the response is not ok, throw an error with the status
                    setValidData(false);
                    throw new Error(`Request failed with status ${response.status}`);
                    
                }
            })
            .then(data => {
                // 'data' is the parsed JSON object from the response body
                // Access the 'token' property from the data
                setValidData(data.results);
                setShow(true);
                console.log(validData); // Log the token or do something with it

                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    

    return(
        
        <form method='post' onSubmit={ handleSubmit } className="flex-col px-80 py-50  h-full mt-40">
            <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                enter date: <input id="today" type="date" name="queryDate"
                 minDate={new Date()}/>
            </label>
            <button className="btn btn-primary mt-6" type="submit">submit</button>
            {
                setShow ? 
                <div className='flex flex-col text-4xl text-white mt-6'>
                    Bookings:
                    {validData.map((booking, index)=>{
                        return(
                            <div className='flex flex-row justify-around text-2xl mt-4 bg-purple-700'>
                                <div>Seat_Id : {booking.Seat_Id}</div>
                                <div>Booking Date: {booking.Booking_Date}</div>
                                <div>Traveller Name: {booking.Traveller_Name}</div>
                                <div>TravelClass Name: {booking.Travel_Class_Name}</div>
                            </div>
                        )
                    }
                    )
                    }
                </div>:
                <div>
                    enter date to get the result
                </div>
            }
        </form>
    );
}