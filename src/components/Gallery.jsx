import { useState, useEffect } from 'react'

function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0].house_photosurl || '')
    }
  }, [images])
  // Fetch data from your backend API

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
        {Array.isArray(images) &&
          images.map((image, index) => (
            <div key={index}>
              <img
                src={image.house_photosurl}
                alt={`Photo ${index + 1}`}
                className="rounded-lg"
                onClick={() => handleImageClick(image.house_photosurl)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
export default Gallery
