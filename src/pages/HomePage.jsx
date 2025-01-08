// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Featured & Best Sellers, etc.
  const featuredProducts = products.slice(0, 4);
  const bestSellerProducts = products.slice(4, 8);

  if (loading) return <div className="home-loading">Loading...</div>;
  if (error) return <div className="home-error">Error: {error}</div>;

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-section">
        <div
          className="hero-background" /* style or backgroundImage in CSS */
        ></div>
        <div className="hero-content">
          <h1>Welcome to My Marketplace</h1>
          <p>Discover a wide range of products and deals!</p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Highlights (Optional) */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {/* Hardcode or dynamically map major categories */}
          <Link to="/products/category/Electronics" className="category-card">
            <img src="public/product_208_1736188228747.png" alt="Electronics" />
            <h3>Electronics</h3>
          </Link>
          <Link to="/products/category/Books" className="category-card">
            <img src="public/product_144_1736187098114.png" alt="Books" />
            <h3>Books</h3>
          </Link>
          {/* ... etc */}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-card">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                className="featured-image"
              />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`} className="details-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers-section">
        <h2>Best Sellers</h2>
        <div className="best-sellers-grid">
          {bestSellerProducts.map((product) => (
            <div key={product.id} className="best-seller-card">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Absolutely love the selection here. Shipping was fast!"</p>
            <h4>- Jane D.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Great prices and amazing customer service!"</p>
            <h4>- Mark S.</h4>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <h2>Stay in the Loop</h2>
        <p>Subscribe for the latest deals and updates!</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
