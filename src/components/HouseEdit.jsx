import Nav from './Nav'
import { Link } from 'react-router-dom'

function HouseEdit() {
  const houseDescription =
    "Nestled on a serene beachfront, this charming Airbb house offers a picturesque escape. The exterior boasts a classic beach house aesthetic with weathered wood siding and a spacious wraparound deck, perfect for savoring the ocean breeze.Inside, you're greeted by an open-concept living area bathed in natural light, complemented by cozy furnishings and nautical accents. The house features three comfortable bedrooms, each with a unique coastal theme, and two modern bathrooms. The fully equipped kitchen opens to a dining area that's ideal for intimate meals or entertaining guests.Large glass doors in the living room lead to the deck, where you can enjoy stunning sunset views over the ocean.This idyllic retreat is a stone's throw away from the soft sandy beach, making it the perfect spot for beach lovers and those seeking a tranquil getaway."
  // Getting house data
  const house = {
    location: 'Phuket, Thailand',
    bedrooms: 2,
    bathrooms: 2,
    description: houseDescription,
    price: 120,
    rating: 4,
    images: [
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_02.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_03.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_04.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_05.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_06.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_07.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_08.png',
      'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_09.png'
    ]
  }
  const totalAmountOfInputs = 9
  const remainderOfInputs = totalAmountOfInputs - house.images.length

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
