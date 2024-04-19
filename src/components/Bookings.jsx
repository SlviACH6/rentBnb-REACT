import Nav from './Nav'
import HouseCard from './HouseCard'

function Bookings() {
  {
    /*create array of objects with all the infomation for every booking that we get*/
  }
  const houses = [
    {
      house_id: 1,
      location: 'Phuket, Thailand',
      rooms: 2,
      bathrooms: 2,
      checkIn: '2024-03-20',
      checkOut: '2024-03-20',
      price: 100,
      totalNights: 8,
      totalPrice: 800,
      reviewRating: 4,
      totalReviews: 12,
      photo:
        'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png'
    },
    {
      house_id: 2,
      location: 'Bali, Indonesia',
      rooms: 2,
      bathrooms: 2,
      checkIn: '2024-03-20',
      checkOut: '2024-03-20',
      price: 120,
      totalNights: 7,
      totalPrice: 750,
      reviewRating: 4,
      totalReviews: 12,
      photo:
        'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png'
    },
    {
      house_id: 3,
      location: 'koh Samui, Thailand',
      rooms: 2,
      bathrooms: 2,
      checkIn: '2024-03-20',
      checkOut: '2024-03-20',
      price: 120,
      totalNights: 7,
      totalPrice: 750,
      reviewRating: 4,
      totalReviews: 12,
      photo:
        'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png'
    },
    {
      house_id: 4,
      location: 'Goa, India',
      rooms: 56,
      bathrooms: 2,
      checkIn: '2024-03-20',
      checkOut: '2024-03-20',
      totalReviews: 12,
      reviewRating: 4,
      price: 120,
      totalNights: 7,
      totalPrice: 500,
      photo:
        'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png'
    },
    {
      house_id: 5,
      location: 'Krabi, Thailand',
      rooms: 56,
      bathrooms: 2,
      checkIn: '2024-03-20',
      checkOut: '2024-03-20',
      price: 120,
      totalNights: 7,
      reviewRating: 4,
      totalPrice: 500,
      totalReviews: 12,
      photo:
        'https://res.cloudinary.com/dsko6ntfj/image/upload/v1640295026/portal/web%20development%20beginners/05%20Project%20Airbnb/house%2001/house_01_01.png'
    }
  ]

  return (
    <div className="container mx-auto">
      <Nav />
      <div className="grid grid-cols-5 gap-3">
        {/* create a loop that goes into the bookingCard array and check the values / sending the info to the child(houseCard) */}

        {houses.map((booking, index) => (
          <HouseCard key={index} house={booking} isbooking={true} />
        ))}
      </div>
    </div>
  )
}

export default Bookings
