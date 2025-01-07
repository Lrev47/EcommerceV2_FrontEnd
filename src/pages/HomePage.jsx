// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom"; // Assuming you use React Router

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch a list of products when the HomePage mounts
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Decide how many “featured” products you want to show
  const featuredProducts = products.slice(0, 4); // example: just first 4

  if (loading) {
    return <div className="home-loading">Loading...</div>;
  }

  if (error) {
    return <div className="home-error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      {/* ========== HERO / BANNER SECTION ========== */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Mystical Marketplace V2</h1>
          <p>Discover a wide range of products and magical deals!</p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS SECTION ========== */}
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
              {/* Link to Product Detail Page (assuming /products/:id route) */}
              <Link to={`/products/${product.id}`} className="details-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
