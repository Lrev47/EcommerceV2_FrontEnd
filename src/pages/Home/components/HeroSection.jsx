import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/heroSection.css';

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1>Welcome to My Marketplace</h1>
        <p>Discover a wide range of products and deals!</p>
        <Link to="/products" className="hero-button">
          Shop Now
        </Link>
      </div>
    </section>
  );
}; 