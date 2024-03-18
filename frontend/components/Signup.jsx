// import { useNavigate } from "react-router-dom";
// import {useState} from 'react';


// export default function Signup() {
//     const navigate = useNavigate();
    
//     const [validData, setValidData] = useState(true);

//     async function handleSubmit(e) {
//       // Prevent the browser from reloading the page
//       e.preventDefault();
  
//       // Read the form data
//       const form = e.target;
//       const formData = new FormData(form);
//       const formJson = Object.fromEntries(formData.entries());
//       console.log(formJson);
//       // You can pass formData as a fetch body directly:
//       await fetch('http://localhost:3000/passengerSignup', { method:'post',headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formJson), }).then(response => {
//             // Check the status code
//             console.log('Status Code:', response.status); // Log the status code
        
//             if(response.ok) {
//                 // If the response is ok (status is in the range 200-299),
//                 // parse the JSON from the response
//                 navigate('/home');
//                 return response.json();
//             } else {
//                 // If the response is not ok, throw an error with the status
//                 setValidData(false);
//                 throw new Error(`Request failed with status ${response.status}`);
                
//             }
//         })
//         .then(data => {
//             // 'data' is the parsed JSON object from the response body
//             // Access the 'token' property from the data
//             const token = data;
//             console.log('Token:', token); // Log the token or do something with it

//             localStorage.setItem('token', token);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

    
//     }
// return (
//     <form method="post" onSubmit={handleSubmit}>
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Signup() {
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
        await fetch('http://localhost:3000/passengerSignup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson),
        }).then(response => {
            // Check the status code
            console.log('Status Code:', response.status); // Log the status code

            if (response.ok) {
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
                const token = data;
                console.log('Token:', token); // Log the token or do something with it

                localStorage.setItem('token', token);
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    return (
        <div className="content-center justify-center">
            <div className="text-center text-purple-700 h-20 text-4xl">SignUp</div>
        <form method="post" onSubmit={handleSubmit} className="flex-col px-80">
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    First Name: <input name="P_FirstName" type="text" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Last Name: <input name="P_LastName" type="text" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Email: <input name="P_Email" type="email" placeholder="enter valid email address" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Password: <input name="P_Password" type="password" placeholder="enter at least 6 chars" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Phone Number: <input name="P_PhoneNumber" type="tel" placeholder="enter 10 digits" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Address: <input name="P_Address" type="text" placeholder="enter street or colony" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    City: <input name="P_City" type="text" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    State: <input name="P_State" type="text" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Zipcode: <input name="P_Zipcode" type="text" />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    Country:
                    <select name="P_Country">
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="China">China</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mexico">Mexico</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Spain">Spain</option>
                        <option value="Netherlands">Netherlands</option>
                    </select>
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit form</button>
            <div>
            {!validData && <p>Invalid input</p>}
            </div>
            
            </form>
            </div>
);
}
    
    //     <label>
    //         First Name: <input name="P_FirstName" type="text" />
    //     </label>
    //     <label>
    //         Last Name: <input name="P_LastName" type="text" />
    //     </label>
    //     <label>
    //         Email: <input name="P_Email" type="email" placeholder="enter valid email address"/>
    //     </label>
    //     <label>
    //         Password: <input name="P_Password" type="password" placeholder="enter atleast 6 chars"/>
    //     </label>
    //     <label>
    //         Phone Number: <input name="P_PhoneNumber" type="tel" placeholder="enter 10 digits"/>
    //     </label>
    //     <label>
    //         Address: <input name="P_Address" type="text" placeholder="enter street or colony"/>
    //     </label>
    //     <label>
    //         City: <input name="P_City" type="text" />
    //     </label>
    //     <label>
    //         State: <input name="P_State" type="text" />
    //     </label>
    //     <label>
    //         Zipcode: <input name="P_Zipcode" type="text" />
    //     </label>
    //     <label>
    //   Country:
    //   <select name="P_Country">
    //     <option value="India">India</option>
    //     <option value="United States">United States</option>
    //     <option value="China">China</option>
    //     <option value="Japan">Japan</option>
    //     <option value="Germany">Germany</option>
    //     <option value="United Kingdom">United Kingdom</option>
    //     <option value="France">France</option>
    //     <option value="Italy">Italy</option>
    //     <option value="Canada">Canada</option>
    //     <option value="Australia">Australia</option>
    //     <option value="Brazil">Brazil</option>
    //     <option value="Mexico">Mexico</option>
    //     <option value="South Korea">South Korea</option>
    //     <option value="Spain">Spain</option>
    //     <option value="Netherlands">Netherlands</option>
    //     <option value="Switzerland">Switzerland</option>
    //     <option value="Sweden">Sweden</option>
    //     <option value="Norway">Norway</option>
    //     <option value="Denmark">Denmark</option>
    //     <option value="Finland">Finland</option>
    //     <option value="Belgium">Belgium</option>
    //   </select>
    // </label>
    //     <hr />
        
 