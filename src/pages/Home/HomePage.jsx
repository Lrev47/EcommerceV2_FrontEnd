// src/pages/Home/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/slices/productSlice";

// Import components
import { HeroSection } from "./components/HeroSection";
import { CategorySection } from "./components/CategorySection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { BestSellers } from "./components/BestSellers";
import { Testimonials } from "./components/Testimonials";
import { Newsletter } from "./components/Newsletter";

// Import styles
import "./styles/home.css";

// Utility to shuffle an array using Fisher-Yates (Durstenfeld) shuffle
import { shuffle } from "../../utils/arrayUtils";

const HomePage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values

  // useEffect removed

  // Ensure products is an array
  const productArray = Array.isArray(products) ? products : [];
  
  // Shuffle products for random selection
  const shuffledProducts = shuffle(productArray);
  
  // Featured & Best Sellers
  const featuredProducts = shuffledProducts.slice(0, 4);
  const bestSellerProducts = shuffledProducts.slice(4, 8);

  if (loading) return <div className="home-loading">Loading...</div>;
  if (error) return <div className="home-error">Error: {error}</div>;

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <HeroSection />
      
      {/* Category Highlights */}
      <CategorySection />
      
      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />
      
      {/* Best Sellers */}
      <BestSellers products={bestSellerProducts} />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default HomePage; 