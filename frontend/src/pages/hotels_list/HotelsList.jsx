import './hotelList.css'
import Header from "../../components/header/Header"
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { useContext, useState,  } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchitem/SearchItem'
import useFetch from '../../components/hooks/UseFetch'
import { SearchContext } from '../../context/SearchContext'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { dispatch } = useContext(SearchContext);

const API = import.meta.env.VITE_BACKEND_URL;
  const { data, loading, error, refetch } = useFetch(`${API}/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  const handleClick = () =>{
    refetch()
  }
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>

            <div className="listSearchItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            <div className="listSearchItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)} > {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate &&
                <DateRange onChange={(item) => setDates([item.selection])} minDate={new Date()} ranges={dates} />
              }
            </div>

            <div className="listSearchItem">
              <label>Options</label>
              <div className="listSearchOptions">
                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Min price <small>per night</small></span>
                  <input className='listSearchOptionInput' onChange={e => setMin(e.target.value)} type="number" />
                </div>



                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Max price <small>per night</small></span>
                  <input className='listSearchOptionInput' onChange={e => setMax(e.target.value)}  type="number" />
                </div>




                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Adult</span>
                  <input className='listSearchOptionInput' min={1} type="number" placeholder={options.adult} />
                </div>




                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Children</span>
                  <input className='listSearchOptionInput' min={0} type="number" placeholder={options.children} />
                </div>




                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Room</span>
                  <input className='listSearchOptionInput' min={1} type="number" placeholder={options.room} />
                </div>

              </div>
            </div>
            <button className='lSearchOptionItemButton' onClick={handleClick}>Search</button>
          </div>


          <div className="listResult">
            {loading ? "...Loading" : (
              <>
                {Array.isArray(data) && data.map(item => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default List