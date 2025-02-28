import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/featuredProducts.css';

export const FeaturedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <div className="featured-grid">
        {products.map(product => (
          <div key={product.id} className="featured-card">
            <img 
              src={product.imageUrl || "/placeholder.png"} 
              alt={product.name}
              className="featured-image"
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}; 