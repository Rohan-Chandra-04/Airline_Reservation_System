import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  
  const navigate = useNavigate()
  return (
    <>
      <button onClick={()=>navigate('/signup')}>Signup</button>
      <button onClick={()=>navigate('/login')}>Login</button>
      <button onClick={()=>navigate('/adminLogin')}>Admin Login</button>
    </>
  )
}

export default App
