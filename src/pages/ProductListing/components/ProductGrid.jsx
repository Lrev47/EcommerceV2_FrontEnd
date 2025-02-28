import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/slices/cartSlice';
// import { toast } from 'react-toastify';
import '../styles/productGrid.css';

const ProductGrid = ({ products }) => {
  // // const dispatch = useDispatch(); - removed - removed

  const handleAddToCart = $3 => {
    console.log("AddToCart handler called with:", arguments[0]);
    console.log("Would dispatch: 
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl
      }")
    );
    // Replace toast with alert
    alert(`${product.name} added to cart!`);
  };

  // Format price with 2 decimal places and add dollar sign
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    
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

  if (!products || products.length === 0) {
    return <div className="no-products">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <Link to={`/product/${product.id}`} className="product-link">
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="product-image"
                />
              )}
              
              {product.discountPrice && (
                <div className="discount-badge">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                </div>
              )}

              {product.newArrival && (
                <div className="new-badge">NEW</div>
              )}
            </Link>
            
            <button 
              className="quick-add-btn"
              onClick={() => handleAddToCart(product)}
              disabled={product.inStock === false}
            >
              <i className="fas fa-shopping-cart"></i> Quick Add
            </button>
          </div>
          
          <div className="product-info">
            <Link to={`/product/${product.id}`} className="product-link">
              <h3 className="product-name">{product.name}</h3>
            </Link>
            
            <div className="product-meta">
              {product.brand && (
                <span className="product-brand">{product.brand}</span>
              )}
              
              {product.category && (
                <span className="product-category">{product.category}</span>
              )}
            </div>
            
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              {product.numReviews > 0 && (
                <span className="review-count">({product.numReviews})</span>
              )}
            </div>
            
            <div className="product-price">
              {product.discountPrice ? (
                <>
                  <span className="discount-price">{formatPrice(product.discountPrice)}</span>
                  <span className="original-price">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="regular-price">{formatPrice(product.price)}</span>
              )}
            </div>
            
            {product.inStock === false && (
              <div className="out-of-stock">Out of Stock</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 