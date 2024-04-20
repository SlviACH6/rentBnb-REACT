import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

function HouseCard({ house, booking, listing }) {
  return (
    <Link to={`/houses/${house.house_id}`}>
      <div className="block border rounded-md">
        <img
          src={house.house_photourl}
          alt="House image"
          className="rounded-t"
        />
        <div className="p-3">
          {/* merge starts here */}
          <h5 className="font-bold">{house.location}</h5>
          <span className="text-sm">
            {house.bedrooms} Rooms • {house.bathrooms} Bathrooms
          </span>
          <h6 className="font-bold py-2">${house.price_night}</h6>
          <div className="flex justify-between">
            <div className="flex">
              {[...new Array(house.star_rating)].map((i, index) => (
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
              {house.reviews || house.reviews_count}
            </p>
          </div>
          {/* if is Listing page */}
          {listing && (
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
          {booking ? (
            <div className=" flex-col justify-center  pt-2 pb-2 bg-green-100 border rounded-lg">
              <div className=" text-center">
                {' '}
                {booking.check_in} - {booking.check_out}
              </div>
              <div className=" text-center font-bold">
                {booking.totalNights} Nights = ${booking.totalPrice}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default HouseCard
