import { useNavigate } from "react-router-dom";
import {useState} from 'react';


export default function AddAirport() {
    const navigate = useNavigate();
    
    const [validData, setValidData] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    async function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
  
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      // You can pass formData as a fetch body directly:
      await fetch('http://localhost:3000/addAirport', { method:'post',headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formJson), }).then(response => {
            // Check the status code
            console.log('Status Code:', response.status); // Log the status code
        
            if(response.ok) {
                // If the response is ok (status is in the range 200-299),
                setTimeout(() => {
                    setShowSuccess(true);
                }, 5000);
                
                return response.json();
            } else {
                // If the response is not ok, throw an error with the status
                setValidData(false);
                throw new Error(`Request failed with status ${response.status}`);
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    
    }
return (
    // <form method="post" onSubmit={handleSubmit}>
    //     <label>
    //         Airport Name: <input name="AirportName" type="text" />
    //     </label>
    //     <label htmlFor="">
    //         Airport City: <input name="AirportCity" type="text" />
    //     </label>
    //     <label htmlFor="">
    //         Airport Country: <input name="AirportCountry" type="text" />
    //     </label>
    //     <hr />
        
    //     <button type="submit">Submit form</button>

    //     {!validData && <p>airport is not added to our list, try again</p>}
    //     {showSuccess && <p>airport added successfully</p>}
    // </form>

    <form method="post" onSubmit={handleSubmit} className="flex-col px-80 py-50  h-full mt-40">
                    
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter Airport Name: 
                        <div>
                            <input type="text" name="AirportName" />
                            
                        </div>
                    </label>
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter City: 
                        <div>
                            <input type="text" name="AirportCity" />
                            
                        </div>
                    </label>
                    <label htmlFor="" className="input input-bordered flex items-center gap-2 mb-2 text-2xl">
                        enter country: <input type="text" name="AirportCountry" />
                    </label>
                    <button className="btn btn-primary" type="submit">Add Airport</button>

                    {!validData && <p>airport is not added to our list, try again</p>}
                    {showSuccess && <p>airport added successfully</p>}
                </form>
);
}