import { useState } from 'react'

function Gallery(props) {
  const images = props.house_photosurl || []
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0] : ''
  )
  const handleImageClick = (event) => {
    setSelectedImage(event.target.src)
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
              onClick={handleImageClick}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Gallery
