import useFetch from '../hooks/UseFetch'
import './feature.css'
const Featured = () => {
    const { data, loading, error }  = useFetch('/api/hotels/countByCity?cities=seaul,islamabad,london')
    


    
    
  return (
    <div className='feature'>

        { loading ? ('Loading please wait') : 
        <>
        <div className="featureItem">
            <img className='featureImg' src="https://th.bing.com/th/id/OIP.Ezbdymz9yssEKv0VBPbpxAHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="" />
            <div className="featureTitle">
                <h1>Seaul</h1>
                <h2>{data[0]} Properties</h2>
            </div>
        </div>
        
        <div className="featureItem">
            <img className='featureImg' src="https://assets-eu-01.kc-usercontent.com/aa24ba70-9a12-01ae-259b-7ef588a0b2ef/85a40b80-3402-497a-b92f-c37458357dc6/dun-na-ri-forest-park-co-cavan.jpg?w=876&h=492&fm=jpg&q=66&fit=crop" alt="" />
            <div className="featureTitle">
                <h1>Islamabad</h1>
                <h2>{data[1]} Properties</h2>
            </div>
        </div>
        <div className="featureItem">
            <img className='featureImg' src="https://tse3.mm.bing.net/th/id/OIP.JTE_rwgnPq-l2KMUvsRn8wHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            <div className="featureTitle">
                <h1>London</h1>
                <h2>{data[2]} Properties</h2>
            </div>
        </div></>}

    </div>
  )
}

export default Featured