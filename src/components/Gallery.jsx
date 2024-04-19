import { useState } from 'react'

function Gallery(props) {
  const images = props.images
  const [selectedImage, setSelectedImage] = useState(images[0])
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <img src={selectedImage} alt="photo1" className="rounded-lg h-full" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div>
            <img
              src={image}
              alt={'photo ' + index}
              className="rounded-lg"
              onClick={(event) => setSelectedImage(event.target.src)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Gallery
