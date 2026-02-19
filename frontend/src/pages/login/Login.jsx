import { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const API = import.meta.env.VITE_BACKEND_URL;
   

    const [credential, setCredential] = useState({
        username: undefined,
        password: undefined,
    })
    const { loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange =  (e) => {
        setCredential((prev) => ({...prev, [e.target.id]: e.target.value} ))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post(`${API}/api/auth/login`, credential)
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
            navigate('/')

        } catch (error) {
            dispatch({type: 'LOGIN_FAIL', payload: error.response.data})
        }
    }
    
    
    return (
        <div className='login'>
            <div className="loginContainer">
                <input type="text" placeholder='username' id='username' onChange={handleChange} className="input" />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className="input" />
                <button disabled={loading} onClick={handleClick} className="loginButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login