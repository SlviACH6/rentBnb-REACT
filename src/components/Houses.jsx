import HouseCard from './HouseCard'
import Filters from './Filters'
import Nav from './Nav'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Houses() {
  const [houses, setHouses] = useState([])
  const getHouses = async () => {
    let housesData = await axios.get('https://haiku-bnb.onrender.com/houses')
    setHouses(housesData.data)
  }
  useEffect(() => {
    getHouses()
  }, [])

  return (
    /* Adding container to position the content wrap the page */
    <div className="container mx-auto">
      <Nav />
      {/* Importing flexbox for the search function from filters */}
      <Filters setHouses={setHouses} />
      {/* Importing houses from HouseCard */}
      <div className="grid grid-cols-5 gap-3">
        {houses.map((house, index) => (
          <HouseCard key={index} house={house} />
        ))}
      </div>
    </div>
  )
}

export default Houses
