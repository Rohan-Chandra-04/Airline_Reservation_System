
import { useNavigate } from "react-router-dom";
import {useState} from 'react';

export default function Login() {
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
        // You can pass formData as a fetch body directly:
        await fetch('http://localhost:3000/passengerLogin', { method:'post',headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson), }).then(response => {
                // Check the status code
                console.log('Status Code:', response.status); // Log the status code
            
                if(response.ok) {
                    // If the response is ok (status is in the range 200-299),
                    // parse the JSON from the response
                    navigate('/home');
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
                const token = data.data;
                console.log('Token:', token); // Log the token or do something with it

                localStorage.setItem('token', token);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Email: <input name="P_Email" type="text" />
            </label>
            <label>
                Password: <input name="P_Password" type="password" />
            </label>
            <button type="submit">Submit</button>

            {!validData && <p>Invalid data</p>}
        </form>
    );
}