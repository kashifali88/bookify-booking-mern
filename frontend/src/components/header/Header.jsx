import  './header.css'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.js'
import { AuthContext } from '../../context/AuthContext.js'

const Header = ({type}) => {
    const[openDate, setOpenDate] = useState(false)
    const[destination, setDestination] = useState('')
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [dates, setDates] = useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
])
const[openOptions, setOpenOptions] = useState(false)
const[options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
})
const handleOption = ((name, operation) => {
    setOptions((prev) => {
        return {
            ...prev, 
            [name]: operation === 'i' ? options[name] + 1 : options[name] -1
        }
    })
})
const handleSearch = (()=> {
    dispatch({ type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate('/hotels', { state: { destination, dates, options }}) 
})
const { dispatch } = useContext(SearchContext)

  return (
    <div className='header'>
        <div className={ type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className="headerList">
            
            <div className="headerListItems active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
            </div>
            
            <div className="headerListItems">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
            </div>
            <div className="headerListItems">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
            </div>
            <div className="headerListItems">
                <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span>
            </div>
            <div className="headerListItems">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport taxis</span>
            </div>
             
          </div>
          { type !== 'list' &&
            <>
          <h1 className="headerTitle">A life time of discounts? it's a genius.</h1>
          <p className="headerDes">Get rewarded for your travels - unlock instant savings of 10% or more with a free Bookify account.</p>
        { !user && <button className='headerButton'>Sign in</button> }
        <div className="headerSearch">

         <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className='headerIcon' />
            <input onChange={(e)=>setDestination(e.target.value)} type="text" placeholder='Where are you going?' className='headerSearchInput' />
            </div>   
         <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
            
            <span onClick={()=> setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
           { openDate &&
           <DateRange minDate={new Date()} className='date' editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} />
            }
            </div>   
         <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
            <span onClick={()=> setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
            {openOptions &&
            <div className="options">

                <div className="optionItem">
                    <span className='optionText'>Adult</span>
                    <button disabled={options.adult <= 1}  onClick={()=> handleOption('adult', 'd')} className="optionCounterButton">-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button  onClick={()=> handleOption('adult', 'i')} className="optionCounterButton">+</button>
                </div>
                
                <div className="optionItem">
                    <span className='optionText'>Children</span>
                    <button  disabled={options.children <= 0} onClick={()=> handleOption('children', 'd')} className="optionCounterButton">-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button  onClick={()=> handleOption('children', 'i')} className="optionCounterButton">+</button>
                </div>
                <div className="optionItem">
                    <span className='optionText'>Room</span>
                    <button  disabled={options.room <= 1} onClick={()=> handleOption('room', 'd')} className="optionCounterButton">-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button  onClick={()=> handleOption('room', 'i')} className="optionCounterButton">+</button>
                </div>

            </div>
                    }
            </div>   

        
         <div className="headerSearchItem">
            <button className="headerButton" onClick={handleSearch}>Search</button>
            </div>   
        
        </div>
        </>
}
        </div>
    </div>
  )
}

export default Header