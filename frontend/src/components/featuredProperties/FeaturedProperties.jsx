import useFetch from '../hooks/UseFetch'
import './featuredProperties.css'

const FeaturedProperties = () => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const { data, loading, error } = useFetch(`${API}/api/hotels?featured=true&limit=4`)
  console.log(data);
  
  const images = [
    "https://th.bing.com/th/id/R.f9d3e0e3b7e7d7417b8f1f5d95e1e392?rik=GXS%2bHz5bg3FSzQ&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.f9d3e0e3b7e7d7417b8f1f5d95e1e392?rik=GXS%2bHz5bg3FSzQ&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.f9d3e0e3b7e7d7417b8f1f5d95e1e392?rik=GXS%2bHz5bg3FSzQ&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.f9d3e0e3b7e7d7417b8f1f5d95e1e392?rik=GXS%2bHz5bg3FSzQ&pid=ImgRaw&r=0"
  ]
  return (
    <div className='featuredProperties'>
     
     { loading ? "Loading" : (
    Array.isArray(data) ? data.map((hotel, index) => (
      <div className="pLItem" key={hotel._id}>
        <img src={images[index]} alt="" className="propertiesImg" />
        <span className="featuredPropertiesName">{hotel.name}</span>
        <span className="featuredPropertiesCity">{hotel.city}</span>
        <span className="featuredPropertiesPrice">Starting from ${hotel.cheapestPrice}</span>
        { hotel.rating && (
          <div className='featuredPropertiesRating'>
            <button>{hotel.rating}</button>
            <span>Excellent</span>
          </div>
        )}
      </div>
    )) : <span>No data available</span>
)}

      

    </div>
  )
}

export default FeaturedProperties