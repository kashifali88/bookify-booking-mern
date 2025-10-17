import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = ()=>{
navigate('/login')
  }
  return (

    <div className='navbar'>
      <div className="navbarContainer">
        <Link to='/' className="logo">Bookify</Link>
        {user ? user.username :
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleClick} className="navButton">Login</button>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar