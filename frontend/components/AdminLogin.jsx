
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

        if(formJson.username === 'admin' && formJson.password === 'admin') {
            navigate('/admin')
        }
        else {
            setValid(false)
        }
    }
    return(
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        enter username: <input name="username" type="text" />
                    </label>
                    <label htmlFor="">
                        enter password: <input name="password" password="password" type="password" />
                    </label>
                    <button type="submit">submit</button>
                </form>

                {!valid && <div>Invalid username or password</div>}
            </div>
        </>
    )
}