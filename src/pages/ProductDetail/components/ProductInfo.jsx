import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/productInfo.css';

const ProductInfo = ({ product, rating, reviewCount }) => {
  // Format price with 2 decimal places and add dollar sign
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <div className="product-info">
      {product.brand && (
        <div className="product-brand">{product.brand}</div>
      )}
      
      <h1 className="product-name">{product.name}</h1>
      
      <div className="product-rating">
        <div className="stars">
          {renderStars(rating || 0)}
        </div>
        <div className="rating-count">
          <Link to="#reviews" className="review-link">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </Link>
        </div>
      </div>
      
      <div className="product-price">
        {product.discountPrice ? (
          <>
            <span className="discount-price">{formatPrice(product.discountPrice)}</span>
            <span className="original-price">{formatPrice(product.price)}</span>
            <span className="discount-percentage">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
            </span>
          </>
        ) : (
          <span className="regular-price">{formatPrice(product.price)}</span>
        )}
      </div>
      
      {product.inStock === false && (
        <div className="out-of-stock">Out of Stock</div>
      )}
      
      {product.inStock && product.countInStock <= 5 && (
        <div className="low-stock">Only {product.countInStock} left in stock - order soon</div>
      )}
      
      {product.features && product.features.length > 0 && (
        <div className="product-features">
          <h3>Key Features</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductInfo; 