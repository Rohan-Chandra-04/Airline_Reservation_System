import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

export default function Profile() {

    const navigate = useNavigate();
    

    const [fetchedData, setFetchedData] = useState({});

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
              // Retrieve the token from local storage
              const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual token key
                console.log('Token:', token);
              if (token) {
                // Set up the request headers
                const config = {
                  headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}` // Assuming you're using Bearer token
                  }
                };
      
                // Send a request to your backend
                const response = await axios.get('http://localhost:3000/passengerDetails', config);
                
                // Process the response
                
                console.log(response.data);
                setFetchedData(response.data.results[0]);

                console.log(fetchedData.P_Email);
              } 
              else {
                navigate('/login');
                console.log('No token found');
              }
            } catch (error) {
              console.error('Failed to fetch user details:', error);
            }
          };
      
          // Call the function
          fetchUserDetails();
    });

    return(
        <>
            {/* <div>
                <div></div>
                <div>your email: {fetchedData.P_Email}</div>
                <div>your phone: {fetchedData.P_Phone}</div>
                <div>your address: {fetchedData.P_Address}</div>
                <div>your city: {fetchedData.P_City}</div>
                <div>your state: {fetchedData.P_State}</div>
                <div>your country: {fetchedData.P_Country}</div>
                <hr></hr>
                <div onClick={()=>navigate('/userEdit')}>Edit your password</div>
            </div> */}
            <h1 className='text-purple-700 text-center text-4xl my-8'>Your Profile</h1>
            <ul className="menu menu-lg bg-base-200 rounded-box mx-240">
              <li className="text-purple-700 text-2xl pb-3 px-60"><a>your name: {fetchedData.P_FirstName + ' '+ fetchedData.P_LastName}</a></li>
              <li className="text-purple-700 text-2xl pb-3 px-60"><a>your email: {fetchedData.P_Email}</a></li>
              <li className="text-purple-700 text-2xl pb-3 px-60"><a >your phone: {fetchedData.P_Phone}</a></li>
              <li className="text-purple-700 text-2xl pb-3 px-60"><a >your city: {fetchedData.P_City}</a></li>
              <li className="text-purple-700 text-2xl pb-3 px-60"><a >your state: {fetchedData.P_State}</a></li>
              <li className="text-purple-700 text-2xl pb-3 px-60"><a >your country: {fetchedData.P_Country}</a></li>
            </ul>
            <div onClick={()=>navigate('/userEdit')} className="text-red-600 text-2xl text-center mt-6">Edit your password</div>
            
        </>
    )
}