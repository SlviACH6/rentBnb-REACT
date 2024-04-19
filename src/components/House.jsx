import Gallery from './Gallery'
import Nav from './Nav'
import Reviews from './Reviews'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function House() {
  const [house, setHouse] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `https://haiku-bnb.onrender.com/houses/${id}`
        )
        if (response.data) {
          setHouse(response.data)
        } else {
          throw new Error('Failed to fetch house data')
        }
      } catch (error) {
        throw new Error(
          'Error fetching houses: ' + (error.message ? error.message : error)
        )
      }
    }

    fetchHouse()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      {/* Gallery */}
      <Gallery images={house.images || []} />
      <div className="grid grid-cols-3 gap-28 mt-4 justify-between">
        {/* Title and description of the listing */}
        <div className="col-span-2">
          <h1 className="text-3xl font-extrabold mb-4">{house.location}</h1>
          {/* bedrooms and bathrooms */}
          <h2 className=" text-gray-500 text-sm mb-8">
            {house.rooms} bedrooms • {house.bathrooms} bathrooms
          </h2>

          {/* Read listing description */}
          <div class="col-span-2">
            {/* host profile picture */}
            <div className="flex mb-8 items-center">
              <div className="w-10">
                <img
                  src={house.host?.picture}
                  alt="host photo"
                  className="w-full rounded-full"
                />
              </div>
              {/* host name*/}
              <div className="ml-5">
                <div className="text-gray-400 text-sm">Hosted by</div>
                <div className="">
                  {house.host?.firstName} {house.host?.lastName}
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
            ${house.price}{' '}
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
