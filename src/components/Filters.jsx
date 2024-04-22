import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faDollarSign,
  faHouse,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

function Filters({ setHouses }) {
  const [locations, setLocations] = useState([])

  // getting locations from db
  const getLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/houses/location`
      )
      if (response.status === 200) {
        setLocations(response.data)
      } else {
        throw new Error('Error in fetching location data.')
      }
    } catch (err) {
      alert(
        'Error in location fetching filters.jsx: ' +
          (err.message ? err.message : err)
      )
      console.error('Error in fetching location data.', err)
    }
  }
  // loading locations list to display in filters form on page mount
  useEffect(() => {
    getLocations()
  }, [])

  // subimt form for filters
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target)
      const formObj = Object.fromEntries(form.entries())

      // creating query request with form data
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/houses?max_price=${formObj.max_price}&min_rooms=${formObj.min_rooms}&search=${formObj.search}&location=${formObj.location}&sort=${formObj.sort}`
      )

      if (data.error) {
        alert('Error in filtering data: ', data.error)
      } else {
        // setting houses in Houses.jsx if there are no errors in the api call
        setHouses(data)
      }
    } catch (err) {
      alert('Error in filtering data: ', err.message ? err.message : err)
    }
  }

  return (
    <div className="bg-slate-100 text-sm p-2 rounded mt-2 mb-4">
      <form onSubmit={submitForm}>
        {/* Location */}
        <div className="flex justify-between gap-2">
          <div className="bg-white flex items-center rounded-md p-2 border-2 border-slate-200 w-[20%] gap-2 text-sm">
            <FontAwesomeIcon icon={faHouse} className="" />
            <select type="select" class="w-full" name="location">
              <option value="">Any Location</option>
              {Array.isArray(locations) &&
                locations.map((house_id, i) => (
                  <option key={i} value={house_id.location}>
                    {house_id.location}
                  </option>
                ))}
            </select>
          </div>

          {/* Number of rooms */}
          <div className="bg-white flex items-center rounded-md p-2 border-2 border-slate-200 w-[20%] gap-2 text-sm">
            <FontAwesomeIcon icon={faBed} className="" />
            <select type="select" class="w-full" name="min_rooms">
              <option value="">Any Rooms</option>
              <option value="1">1 room</option>
              <option value="2">2 rooms</option>
              <option value="3">3 rooms</option>
              <option value="4">4 rooms</option>
              <option value="5">5 rooms</option>
            </select>
          </div>

          {/* Max price */}
          <div className="bg-white flex items-center rounded-md p-2 border-2 border-slate-200 w-[20%] gap-2 text-sm">
            <FontAwesomeIcon icon={faDollarSign} className="" />
            <input
              type="number"
              class="w-full"
              placeholder="max price"
              name="max_price"
            />
          </div>

          {/* Sort by */}
          <div className="bg-white flex items-center rounded-md p-2 border-2 border-slate-200 w-[20%] gap-2 text-sm">
            <FontAwesomeIcon icon={faSort} className="" />
            <select type="select" className="w-full" name="sort">
              <option value="">sort by</option>
              <option value="price">Price: low to high</option>
              <option value="rooms">Rooms: high to low</option>
            </select>
          </div>

          {/* Keywords */}
          <div className="bg-white flex items-center rounded-md p-2 border-2 border-slate-200 w-[20%] gap-2 text-sm">
            <input
              name="search"
              type="text"
              class="w-full"
              placeholder="keywords..."
            />
          </div>

          {/* Submit button */}
          <button className="rounded-md bg-[#FB7185] text-white p-2 ">
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default Filters
