
import useFetch from '../hooks/UseFetch'
import './propertylist.css'
const PropertyList = () => {
        const API = import.meta.env.VITE_BACKEND_URL;

    const { data, loading, error }  = useFetch(`${API}/api/hotels/countByType`)
    const images = [
        "https://www.bing.com/th/id/OIP.mMBkK4uFwZdwW8SFHKeiMwHaE8?w=272&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        "https://tse4.mm.bing.net/th/id/OIP.PTGaLOO5hU_FRYg4V2xdugHaGj?rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://tse2.mm.bing.net/th/id/OIP.Gs1ypL-j6rc1uwEoDIY4wQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://tse2.mm.bing.net/th/id/OIP.Gs1ypL-j6rc1uwEoDIY4wQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://th.bing.com/th/id/R.e110a3ae09c806737e0b79e904ac75c3?rik=XuynrfuiUE0dOw&pid=ImgRaw&r=0"
    ]
        
    
  return (
    <div  className='propertyList'>

       { loading ? ('loading') :  (
        <>
        { data && images.map((image,i) => (
            <div className="propertyListItem" key={i}>
            <img className='propertyListImg' src={image} alt="" />
            <div className="propertyListHotels">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        </div> 
        ))}
        </>
    )}

    </div>
  )
}

export default PropertyList