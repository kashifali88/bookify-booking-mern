import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../hooks/UseFetch'
import { useContext, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({ setOpen, hotelId }) => {
        const API = import.meta.env.VITE_BACKEND_URL;

    const { data, loading, error, dispatch } = useFetch(`${API}/api/hotels/room/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const { dates } = useContext(SearchContext)
    const navigate = useNavigate()

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)

        }
        return dates
    }

    // if (dates?.[0]?.startDate && dates?.[0]?.endDate) { }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }



    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));

    }

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(async (roomId) => {
                    const res = await axios.put(`${API}/api/rooms/availability/${roomId}`, { dates: allDates });
                    console.log(res.data);
                    return res.data;
                })
            );
            setOpen(false)
            navigate('/')
        } catch (error) {
            console.log(error);

        }
    };




    return (
        <div className='reserve'>
            <div className="reserveContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='reserveClose' onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {Array.isArray(data) && data.map(item => (
                    <div className='reserveItem' >
                        <div className='reserveItemInfo'>
                            <div className='reserveTitle'>{item.title}</div>
                            <div className='reserveDesc'>{item.desc}</div>
                            <div className='reserveMax'>Max people: <b>{item.maxPeople}</b></div>
                            <div className='reservePrice'>${item.price}</div>
                        </div>
                        <div className="reserveSelectRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className='room' >
                                    <label>{roomNumber.number}</label>
                                    <input disabled={!isAvailable(roomNumber)} type='checkbox' value={roomNumber._id} onChange={handleSelect} />
                                </div>

                            ))}
                        </div>

                    </div>

                ))}
                <button onClick={handleClick} className="reserveButton">Reserve now</button>
            </div>
        </div>
    )
}

export default Reserve