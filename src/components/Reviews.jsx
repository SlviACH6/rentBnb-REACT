import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Reviews({ rating }) {
  const [reviews, setReviews] = useState([])
  const { id } = useParams()
  const [reviewSent, setReviewSent] = useState(false)

  // get all reviews for the house Id
  const getReviews = async () => {
    try {
      const { data } = await axios.get(
        `https://haiku-bnb.onrender.com/reviews?house_id=${id}`
      )
      setReviews(data)
    } catch (error) {
      throw new Error(
        'Error fetching reviews: ',
        error.message ? error.message : error
      )
    }
  }

  // creating new review
  const createReview = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const formObj = Object.fromEntries(form.entries())
      formObj.house_id = id
      formObj.rating = formObj.form_rating
      const { data } = await axios.post(
        `https://haiku-bnb.onrender.com/reviews`,
        formObj
      )

      if (data.error) {
        alert('Error in posting review: ', data.error)
      }
      if (data.review_id) {
        setReviewSent(true)
      }
    } catch (err) {
      alert('Error in posting review: ', err)
    }
  }

  // fetching reviews on page mount
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-28">
      <div className="col-span-2">
        <div className="text-2xl font-bold">
          <div className="">
            <FontAwesomeIcon icon={faCommentDots} className="text-[#94A3B8]" />
            {reviews.length} Reviews
          </div>
        </div>
        <p className="text-sm">
          <div className="flex gap-2">
            <div className="">
              {[...new Array(rating)].map((i, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className=" text-yellow-400"
                />
              ))}
            </div>
            {rating}
          </div>
        </p>
        {reviews?.map((review, index) => {
          return <Review review={review} key={index} />
        })}
      </div>
      {/* Leaving a Review Option */}
      <div>
        {!reviewSent ? (
          <div className="border-2 rounded p-4">
            <form onSubmit={createReview}>
              <p className="text-m ">Leave a Review</p>

              <div className="flex gap-1 py-2">
                <input type="radio" value={1} name="form_rating" />
                <input type="radio" value={2} name="form_rating" />
                <input type="radio" value={3} name="form_rating" />
                <input type="radio" value={4} name="form_rating" />
                <input type="radio" value={5} name="form_rating" />
              </div>
              <textarea
                type="text"
                name="content"
                placeholder="Please leave a review for this house..."
                rows="6"
                className="w-full border-2 rounded p-2"
                required={true}
              />
              <button
                type="submit"
                className="rounded-md bg-[#FB7185] text-white p-2 "
              >
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          //  when review is sent, show thankyou message
          <div className="bg-green-200 p-auto py-4 max-h-14 ">
            <p className="items-center justify-center text-center">
              Thank you for your review!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Review({ review }) {
  return (
    <div className="p-2 rounded border-2 m-2">
      <div className="flex gap-2">
        {/* guest profile photo */}
        <div className="">
          <img
            src={review.author.picture}
            alt="Guest review photo"
            className="w-10 rounded-full"
          />
        </div>
        {/* review date & guest name */}
        <div>
          <p className="text-xs text-slate-400">{review.date}</p>
          <p className="text-sm font-semibold">
            {review.author.firstName} {review.author.lastName}
          </p>
        </div>
      </div>
      {/* review star rating & review */}
      <p className="text-xs"> ⭐️{review.rating} Rating</p>
      <p className="text-sm">{review.content}</p>
    </div>
  )
}

export default Reviews
