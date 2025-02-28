import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/productSlice";
import "../styles/recommendedProducts.css";

const RecommendedProducts = () => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  // useEffect removed

  if (loading || !recommendedProducts.length) {
    return (
      <div className="recommended-products">
        <h3 className="recommended-title">You May Also Like</h3>
        <div className="loading-recommendations">Loading recommendations...</div>
      </div>
    );
  }

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="recommended-products">
      <h3 className="recommended-title">You May Also Like</h3>
      
      <div className="product-grid">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-category">{product.category}</div>
                <div className="product-price">{formatPrice(product.price)}</div>
              </div>
            </Link>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
      
      <div className="view-all-container">
        <Link to="/products" className="view-all-link">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default RecommendedProducts; 