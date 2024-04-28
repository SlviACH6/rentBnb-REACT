import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Gallery from './Gallery'
import Nav from './Nav'
import Reviews from './Reviews'
import Booking from './Booking'

axios.defaults.withCredentials = true

function House() {
  const [house, setHouse] = useState({
    house_photos: [], // Ensure house_photos is initialized as an empty array
    house_host: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    first_name: '',
    last_name: '',
    description: '',
    price_night: 0,
    rating: 0
  })
  const params = useParams()

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/houses/${params.house_id}`
        )
        if (response.data && response.data.length > 0) {
          setHouse(response.data[0])
          fetchPhotos(response.data[0].house_id)
        } else {
          throw new Error('Failed to fetch house data')
        }
      } catch (error) {
        console.error('Error fetching houses: ', error)
      }
    }

    fetchHouse()
  }, [params.house_id])

  const fetchPhotos = async (house_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/photos/${house_id}`
      )
      if (response.data && response.data.length > 0) {
        // Set the fetched photos to house.house_photos
        setHouse((prevHouse) => ({ ...prevHouse, house_photos: response.data }))
      } else {
        console.log('No photos found for house:', house_id)
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }
  console.log()

  return (
    <div className="container mx-auto">
      <Nav />
      {/* Gallery */}
      <Gallery images={house.house_photos} />
      <div className="grid grid-cols-3 gap-28 mt-4 justify-between">
        {/* Title and description of the listing */}
        <div className="col-span-2">
          <h1 className="text-3xl font-extrabold mb-4">{house.location}</h1>
          {/* bedrooms and bathrooms */}
          <h2 className=" text-gray-500 text-sm mb-8">
            {house.bedrooms} bedrooms • {house.bathrooms} bathrooms
          </h2>

          {/* Read listing description */}
          <div class="col-span-2">
            {/* host profile picture */}
            <div className="flex mb-8 items-center">
              <div className="w-10">
                <img
                  src={house.host}
                  alt="host photo"
                  className="w-full rounded-full"
                />
              </div>
              {/* host name*/}
              <div className="ml-5">
                <div className="text-gray-400 text-sm">Hosted by</div>
                <div className="">
                  {house.first_name} {house.last_name}
                </div>
              </div>
            </div>
            {/*house description*/}
            <div>
              <p>{house.description}</p>
            </div>
          </div>
        </div>

        {/* Booking */}
        <div className="border rounded-md p-4 mb-10">
          <h6 className="font-bold text-lg">
            ${house.price_night}{' '}
            <span className="text-gray-400 text-xs">/ night</span>
          </h6>
          <Booking house={house} />
        </div>
      </div>

      {/* import reviews */}
      <Reviews rating={house.rating} />
    </div>
  )
}

export default House
