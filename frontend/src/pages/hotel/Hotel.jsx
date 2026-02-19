import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Headers from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useContext, useState, useEffect } from 'react'
import useFetch from '../../components/hooks/UseFetch'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.js'
import { AuthContext } from '../../context/AuthContext.js'
import Reserve from '../../components/reserve/Reserve.jsx'


const Hotel = () => {
      const API = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading, error, reFetch } = useFetch(`${API}/api/hotels/find/${id}`)
  const { dates, options } = useContext(SearchContext)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const { user } = useContext(AuthContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays
  }
  const days =
    dates.length > 0
      ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
      : 0;




  const handleOpen = (index) => {
    setSlideNumber(0)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'left') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }


  return (
    <div>
      <Navbar />
      <Headers type='list' />
      {loading ? ("Loading") : (
        <div className="hotelContainer">
          {open &&
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} onclick={() => handleMove('left')} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} onclick={() => handleMove('right')} />

            </div>}

          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className='hotelAddress'>{data.address}</span>
            <span className="hotelDistance">{data.distance}</span>
            <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice}at this property and get a free airport taxi</span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImageWrapper" key={index}>
                  <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotelImage" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className='hotelDes'>{data.desc} </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
                <h2><b>${days * data.cheapestPrice * options.room}</b> ({days}nights)</h2>
                <button onClick={handleClick}>Reserve or Book now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>)}
        {openModal && <Reserve setOpen = {setOpenModal} hotelId={id} /> }
    </div>
  )
}

export default Hotel