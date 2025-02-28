import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bestSellers.css';

export const BestSellers = ({ products }) => {
  if (!products || products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <section className="best-sellers-section">
      <h2>Best Sellers</h2>
      <div className="best-sellers-grid">
        {products.map(product => (
          <div key={product.id} className="best-seller-card">
            <img 
              src={product.imageUrl || "/placeholder.png"} 
              alt={product.name}
              className="best-seller-image"
            />
            <div className="best-seller-details">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="details-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 