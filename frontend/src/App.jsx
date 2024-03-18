import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  
  const navigate = useNavigate()
  return (
    <>
      <h1 className="text-center text-purple-700 text-6xl my-8">AirLine Reservation System</h1>
      {/* <button onClick={()=>navigate('/signup')}>Signup</button>
      <button onClick={()=>navigate('/login')}>Login</button>
      <button onClick={()=>navigate('/adminLogin')}>Admin Login</button> */}

      <div className='grid grid-cols-3 pt-10 gap-10'>
                  <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src="/user.png" alt="User" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Hello Newbie!</h2>
                <p>Create an account here to book flights</p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={()=>navigate('/signup')}>Signup</button>
                </div>
              </div>
            </div>

                      <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="/newUser.png" alt="new User" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Hello User</h2>
              <p>Do you wanna book flights?</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={()=>navigate('/login')}>Login</button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="/admin.png" alt="admin" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Hello Admin!</h2>
              <p>Login here to manage the flights for user convenience?</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={()=>navigate('/adminLogin')}>Admin Login</button>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
