import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

function HouseCard(props) {
  const { isListing } = props
  const { isbooking } = props
  const {
    house_id,
    location,
    rooms,
    bathrooms,
    price,
    rating,
    reviews,
    reviews_count,
    photo,
    checkIn,
    checkOut,
    totalNights,
    totalPrice
  } = props.house

  return (
    <Link to={`/houses/${house_id}`}>
      <div className="block border rounded-md">
        <img src={photo} alt="House image" className="rounded-t" />
        <div className="p-3">
          {/* merge starts here */}
          <h5 className="font-bold">{location}</h5>
          <span className="text-sm">
            {rooms} rooms • {bathrooms} bathrooms
          </span>
          <h6 className="font-bold py-2">${price}</h6>
          <div className="flex justify-between">
            <div className="flex">
              {[...new Array(rating)].map((i, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className=" text-yellow-400"
                />
              ))}
            </div>
            <p>
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-[#94A3B8] mr-1"
              />
              {reviews || reviews_count}
            </p>
          </div>
          {/* if is Listing page */}
          {isListing && (
            <div className="flex justify-start gap-2 mt-2">
              <button
                type="submit"
                className="rounded-md font-light border p-1 px-2 text-sm"
              >
                View
              </button>
              <button
                type="submit"
                className="rounded-md font-light border p-1 px-2 text-sm"
              >
                Edit
              </button>
            </div>
          )}

          {/* if is booking page */}
          {isbooking ? (
            <div className=" flex-col justify-center  pt-2 pb-2 bg-green-100 border rounded-lg">
              <div className=" text-center">
                {' '}
                {checkIn} - {checkOut}
              </div>
              <div className=" text-center font-bold">
                {totalNights} Nights = ${totalPrice}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default HouseCard
