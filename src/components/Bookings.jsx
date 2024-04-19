import { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './Nav'
import HouseCard from './HouseCard'

axios.defaults.withCredentials = true

function Bookings() {
  // Data
  const [bookings, setBookings] = useState([])
  // Functions
  const getBookings = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/bookings`
    )
    setBookings(data)
  }
  // Effects
  useEffect(() => {
    getBookings()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <div className="grid grid-cols-5 gap-3">
        {bookings.map((h, i) => (
          <HouseCard house={h} key={i} booking={true} />
        ))}
      </div>
    </div>
  )
}

export default Bookings
