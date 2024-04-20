import Nav from './Nav'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function HouseEdit() {
  // Data
  const [house, setHouse] = useState({
    images: [],
    host: {}
  })
  const { id } = useParams()
  const navigate = useNavigate()
  // Functions
  const getHouse = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/houses/${id}`
    )
    setHouse(data)
  }
  const updateHouse = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let photos = form.getAll('photos')
    let formObject = Object.fromEntries(form.entries())
    formObject.photos = photos
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/houses/${id}`,
      formObject
    )
    setHouse(data)
    navigate(`/houses/${id}`)
  }
  // Effects
  useEffect(() => {
    getHouse()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      {/* House Edit Form */}
      <div className="border rounded-md p-4 ">
        <h5 className="mb-4">Edit your Listing</h5>
        {/* Grid layout */}

        <div className="grid grid-cols-2 gap-24">
          {/* Starting Column 1 of the main grid */}
          <div class="grid gap-0">
            {/* House Location */}
            <label className="text-slate-400 text-sm mb-[-8px]">Location</label>
            <input
              className="border rounded-md h-10 px-2"
              type="text"
              defaultValue={house.location}
            />

            {/* Bedrooms */}
            <label className="text-slate-400 text-sm mb-[-8px]">Bedroom</label>
            <input
              className="border rounded-md h-10 px-2"
              type="text"
              defaultValue={house.bedrooms}
            />

            {/* Bathrooms */}
            <label className="text-slate-400 text-sm mb-[-8px]">Bathroom</label>
            <input
              className="border rounded-md h-10 px-2"
              type="text"
              defaultValue={house.bathrooms}
            />

            {/* Price per night */}
            <label className="text-slate-400 text-sm mb-[-8px]">
              Price per Night
            </label>
            <input
              className="border rounded-md h-10 px-2"
              type="text"
              defaultValue={house.price}
            />

            {/* Description */}
            <label className="text-slate-400 text-sm mb-[-8px]">
              Description
            </label>
            <textarea
              className="border rounded-md px-2"
              rows={4}
              defaultValue={house.description}
            />

            <div className="flex gap-2">
              {/* Submit button */}
              <button className="rounded-md bg-[#FB7185] w-32 text-white text-base p-2 mt-4">
                Save Changes
              </button>
              {/* Cancel button */}
              <Link
                to="/listings"
                className="rounded-md border-2 w-20 text-base p-2 mt-4"
              >
                Cancel
              </Link>
            </div>
          </div>
          {/* Starting Column 2 of the main grid */}
          <div class="grid gap-2">
            {/* Add/Edit photos section */}

            <label className="text-slate-400 text-sm mb-[-8px]">Photos</label>
            {house.images.map((image, index) => (
              <input
                key={index}
                className="border rounded-md h-10 px-2"
                type="text"
                defaultValue={image}
              />
            ))}
            {[...Array(remainderOfInputs)].map((index) => (
              <input
                key={index}
                className="border rounded-md h-10 px-2"
                type="text"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseEdit
