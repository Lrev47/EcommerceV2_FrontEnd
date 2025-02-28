import React, { useState } from 'react';
import '../styles/productGallery.css';

const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images.length > 0 ? images[0] : null);
  const placeholderImage = "https://via.placeholder.com/400x400?text=No+Image+Available";

  const handleThumbnailClick = $3 => {
    console.log("ThumbnailClick handler called with:", arguments[0]);
    setMainImage(image);
  };

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="main-image-container">
          <img 
            src={placeholderImage} 
            alt="Product placeholder" 
            className="main-image" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div className="main-image-container">
        <img 
          src={mainImage || images[0] || placeholderImage} 
          alt="Product" 
          className="main-image" 
        />
      </div>
      
      {images.length > 1 && (
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${mainImage === image ? 'active' : ''}`} 
              onClick={() => handleThumbnailClick(image)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 