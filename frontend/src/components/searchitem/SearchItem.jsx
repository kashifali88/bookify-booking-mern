import { Link } from 'react-router-dom'
import './searchItem.css'
const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
      <img src={item.photos[0]} alt="" className="searchItemImage" />
      <div className="searchItemDes">
        <h1 className="searchItemTitle">{item.name}</h1>
        <span className="searchItemDistance">{item.distance}</span>
        <span className="searchItemTaxiOp">Free airport taxi</span>
        <span className="searchItemSubtitle">Studio Apartment with Air Conditioning</span>
        <span className="searchItemFeatures">{item.desc}</span>
        <span className="searchItemCancelOp">Free cancellation</span>
        <span className="searchItemCancelOpSubtitle">You can cancel later, so lock in this great price today! </span>
      </div>
      <div className="searchItemDetails">
      { item.rating && 
      <div className="searchItemRatings">
        <span>Excellent</span>
        <button>{item.rating}</button>
        </div> }
        <div className="searchItemDetailsTexts">
          <span className="searchItemPrice">${item.cheapestPrice}</span>
          <span className="searchItemTaxOp">Includes taxes and fees</span>
          <Link to={`/hotel/${item._id}`}>
          <button className="searchItemCheckButton">See availability</button>
          </Link>
        
      </div>
      </div>
    </div>
  )
}

export default SearchItem