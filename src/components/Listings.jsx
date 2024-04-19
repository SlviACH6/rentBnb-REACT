import { useEffect, useState } from 'react'
import HouseCard from './HouseCard'
import Nav from './Nav'
import axios from 'axios'

function Listings() {
  const [dblistings, setdbListings] = useState([])
  const [newListing, setNewListing] = useState({})

  const getListings = async () => {
    try {
      const { data } = await axios.get(
        'https://haiku-bnb.onrender.com/listings'
      )
      setdbListings(data)
      console.log(dblistings)
    } catch (err) {
      console.log('Error in fetching Listing')
    }
  }

  const createHouse = async (e) => {
    try {
      e.preventDefault()
      let form = new FormData(e.target)
      let formObject = Object.fromEntries(form.entries())
      formObject.photos = form.getAll('photos')

      const { data } = await axios.post(
        'https://haiku-bnb.onrender.com/houses',
        formObject
      )
      if (data.house_id) {
        setNewListing(data)
      }
    } catch (err) {
      console.log('Error in creating a Listing')
    }
  }

  useEffect(() => {
    getListings()
  }, [newListing])

  return (
    <div className="container mx-auto">
      <Nav />
      {/* Flexbox for new listings */}
      <div className="border rounded-md p-4 ">
        <form onSubmit={createHouse}>
          <h5 className="mb-4">List a House</h5>
          {/* Grid layout */}

          <div className="grid grid-cols-2 gap-24">
            {/* Starting Column 1 of the main grid */}
            <div className="grid gap-0">
              {/* House Location */}
              <label className="text-slate-400 text-sm mb-[-8px]">
                Location
              </label>
              <input
                name="location"
                className="border rounded-md h-10 px-2"
                type="text"
              />

              {/* Bedrooms */}
              <label className="text-slate-400 text-sm mb-[-8px]">
                Bedroom
              </label>
              <input
                name="rooms"
                className="border rounded-md h-10 px-2"
                type="text"
              />

              {/* Bathrooms */}
              <label className="text-slate-400 text-sm mb-[-8px]">
                Bathroom
              </label>
              <input
                name="bathrooms"
                className="border rounded-md h-10 px-2"
                type="text"
              />

              {/* Price per night */}
              <label className="text-slate-400 text-sm mb-[-8px]">
                Price per Night
              </label>
              <input
                name="price"
                className="border rounded-md h-10 px-2"
                type="text"
              />

              {/* Description */}
              <label className="text-slate-400 text-sm mb-[-8px]">
                Description
              </label>
              <textarea
                name="description"
                className="border rounded-md px-2"
                rows={4}
              />

              <div className="flex gap-2">
                {/* Submit button */}
                <button className="rounded-md bg-[#FB7185] w-32 text-white text-base p-2 mt-4">
                  Save Changes
                </button>
                {/* Cancel button */}
                <button className="rounded-md border-2 w-20 text-base p-2 mt-4">
                  Cancel
                </button>
              </div>
            </div>
            {/* Starting Column 2 of the main grid */}
            <div className="grid gap-2">
              {/* Add/Edit photos section */}
              <label className="text-slate-400 text-sm mb-[-8px]">Photos</label>
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
              <input
                name="photos"
                className="border rounded-md h-10 px-2"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Flexbox to display existing house listings */}
      <div className="grid grid-cols-5 gap-3 mt-4">
        {dblistings.map((house, index) => (
          <HouseCard key={index} house={house} isListing={true} />
        ))}
      </div>
    </div>
  )
}

export default Listings
