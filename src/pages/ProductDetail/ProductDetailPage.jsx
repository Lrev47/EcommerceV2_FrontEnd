import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/slices/productSlice';
import { fetchReviewsByProduct } from '../../redux/slices/reviewSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import ProductInfo from './components/ProductInfo';
import ProductGallery from './components/ProductGallery';
import ProductReviews from './components/ProductReviews';
import ProductActions from './components/ProductActions';
import './styles/productDetail.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  // useSelector hook removed - using placeholder values
  const [quantity, setQuantity] = useState(1);
  
  // useEffect removed

  const handleQuantityChange = $3 => {
    console.log("QuantityChange handler called with:", arguments[0]);
    setQuantity(newQuantity);
  };

  const handleAddToCart = $3 => {
    console.log("AddToCart handler called with:", arguments[0]);
    if (product) {
      console.log("Would dispatch action:", "addToCart");
    }
  };

  // Mock data for stripped functionality
  const productLoading = false;
  const productError = null;
  const product = {
    _id: '1',
    name: 'Sample Product',
    price: 99.99,
    images: ['sample-image.jpg'],
    description: 'This is a sample product description.',
    rating: 4.5,
    countInStock: 10,
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White', 'Red']
  };
  const reviews = [];
  const reviewsLoading = false;
  const reviewsError = null;

  if (productLoading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="product-detail-error">
        <h2>Error</h2>
        <p>{productError}</p>
        <Link to="/products" className="browse-products-link">Browse Other Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="browse-products-link">Browse Other Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-left">
          <ProductGallery images={product.images || []} />
        </div>
        
        <div className="product-detail-right">
          <ProductInfo 
            product={product} 
            rating={product.rating}
            reviewCount={reviews.length}
          />
          
          <ProductActions 
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      
      <div className="product-detail-description">
        <h3>Description</h3>
        <div className="description-content">
          {product.description}
        </div>
      </div>
      
      <ProductReviews 
        productId={productId} 
        reviews={reviews} 
        loading={reviewsLoading} 
        error={reviewsError}
      />
    </div>
  );
};

export default ProductDetailPage; 