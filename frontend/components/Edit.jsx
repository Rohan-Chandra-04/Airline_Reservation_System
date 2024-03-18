import { useNavigate } from "react-router-dom";
import {useState} from 'react';

export default function Edit() {
    const navigate = useNavigate();
    const [validData, setValidData] = useState(true);
    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        if (formJson.P_Password !== formJson.P_Confirm_Password && formJson.P_Password.length >= 6) {
            console.log('invalid input');
            setValidData(false);
        }
        else{
            await fetch('http://localhost:3000/passengerEdit', { method:'post',headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formJson), }).then(response => {
                    // Check the status code
                    console.log('Status Code:', response.status); // Log the status code
                
                    if(response.ok) {
                        // If the response is ok (status is in the range 200-299),
                        // parse the JSON from the response
                        alert('Password changed successfully')
                        navigate('/profile');
                        return response.json();
                    } 
                    else {
                        // If the response is not ok, throw an error with the status
                        setValidData(false);
                        throw new Error(`Request failed with status ${response.status}`);
                        
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        // You can pass formData as a fetch body directly:
        
    }
    return (
        <form method="post" onSubmit={handleSubmit} className="flex-col px-80 py-50  h-full mt-40">
            <div className="text-center h-20 text-4xl text-purple-700">Edit Password</div>
            <label className="input input-bordered flex items-center gap-2">
                Password: <input name="P_Password" type="password" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Confirm Password: <input name="P_Confirm_Password" type="password" />
            </label>
            <button type="submit" className="btn btn-primary">Submit</button>

            {!validData && <div className="text-red-700 text-2xl">Invalid input, try again</div>}
        </form>
    )
}