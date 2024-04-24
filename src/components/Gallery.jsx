import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Gallery() {
  const params = useParams()
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    // Fetch data from your backend API
    axios
      .get(`${process.env.REACT_APP_API_URL}/house_photos/${params.house_id}`)
      .then((response) => {
        setImages(response.data.house_photosurl || [])
        setSelectedImage(response.data.house_photosurl[0] || '')
      })
      .catch((error) => {
        console.error('Error fetching images:', error)
      })
  }, [params.house_id])

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <img src={selectedImage} alt="photo1" className="rounded-lg h-full" />
      </div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Photo ${index + 1}`}
              className="rounded-lg"
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Gallery
