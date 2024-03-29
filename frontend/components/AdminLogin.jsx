
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function AdminLogin() {

    const navigate = useNavigate()
    const [valid, setValid] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const formJson = Object.fromEntries(data.entries());

        console.log(formJson)

        if(formJson.P_Email === 'admin' && formJson.P_Password === 'admin') {
            navigate('/admin')
        }
        else {
            setValid(false)
        }
    }
    return(
        <>
            
            <form method="post" onSubmit={handleSubmit} className="flex-col px-80 py-50  h-full mt-40">
            
            <div className="text-center h-20 text-4xl text-purple-700">Admin Login</div>
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input type="text" className="grow" placeholder="daisy@site.com" name="P_Email"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input type="password" className="grow" placeholder="" name="P_Password"/>
            </label>
            <button className="btn btn-primary" type="submit">submit</button>

            {!valid && <p className="text-red-700 text-2xl">Invalid data....</p>}
        </form>
            
        </>
    )
}