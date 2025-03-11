// src/pages/HomePage.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

/** Utility to shuffle an array using Fisher-Yates (Durstenfeld) shuffle **/
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

  // Shuffle products whenever 'products' changes
  const shuffledProducts = useMemo(() => shuffle(products), [products]);

  // Featured & Best Sellers, etc.
  const featuredProducts = shuffledProducts.slice(0, 4);
  const bestSellerProducts = shuffledProducts.slice(4, 8);

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

      {/* Category Highlights - REDESIGNED */}
      <section className="categories-section">
        <div className="categories-container">
          <div className="section-heading">
            <h2>Shop by Category</h2>
            <p>Browse our wide selection of products organized by category</p>
          </div>
          
          <div className="categories-grid">
            {/* Electronics */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Electronics.png" alt="Electronics" className="category-image" />
              </div>
              <div className="category-content">
                <h3>Electronics</h3>
                <p>Discover the latest gadgets and electronic devices for your home and office</p>
                <Link to="/products/category/Electronics" className="category-link">
                  Browse Electronics <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            {/* Fitness */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Fitness.png" alt="Fitness" className="category-image" />
              </div>
              <div className="category-content">
                <h3>Fitness</h3>
                <p>Equipment and accessories to help you stay in shape and reach your fitness goals</p>
                <Link to="/products/category/Fitness" className="category-link">
                  Browse Fitness <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            {/* Bed and Bath */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Bed and Bath.png" alt="Bed and Bath" className="category-image" />
                <span className="category-badge">Popular</span>
              </div>
              <div className="category-content">
                <h3>Bed & Bath</h3>
                <p>Luxury bedding, towels, and accessories for your bedroom and bathroom</p>
                <Link to="/products/category/Bed and Bath" className="category-link">
                  Browse Bed & Bath <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            {/* Home & Office */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Home and Office.png" alt="Home & Office" className="category-image" />
              </div>
              <div className="category-content">
                <h3>Home & Office</h3>
                <p>Furniture, decor, and supplies to transform your living and work spaces</p>
                <Link to="/products/category/Home & Office" className="category-link">
                  Browse Home & Office <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            {/* Health & Wellness */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Health and Wellness.png" alt="Health & Wellness" className="category-image" />
              </div>
              <div className="category-content">
                <h3>Health & Wellness</h3>
                <p>Products to support your health, wellbeing, and self-care routines</p>
                <Link to="/products/category/Health & Wellness" className="category-link">
                  Browse Health & Wellness <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            
            {/* Apparel */}
            <div className="category-card">
              <div className="category-image-container">
                <img src="/Apparel.png" alt="Apparel" className="category-image" />
                <span className="category-badge">New</span>
              </div>
              <div className="category-content">
                <h3>Apparel</h3>
                <p>Stylish clothing, shoes, and accessories for all seasons</p>
                <Link to="/products/category/Apparel" className="category-link">
                  Browse Apparel <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED Featured Products Section */}
      <section className="featured-section">
        <div className="featured-container">
          <div className="featured-header">
            <div className="featured-title-wrapper">
              <h2 className="featured-title">Featured Products</h2>
              <p className="featured-subtitle">Discover our handpicked selection of outstanding products</p>
            </div>
            <Link to="/products" className="view-all-link">
              View All Products <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-card">
                {product.isNew && <span className="featured-badge">New</span>}
                {product.discount > 0 && (
                  <span className="featured-discount-badge">{product.discount}% OFF</span>
                )}
                <div className="featured-image-container">
                  <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    className="featured-image"
                  />
                </div>
                <div className="featured-content">
                  <span className="featured-category">{product.category || 'Uncategorized'}</span>
                  <h3>{product.name}</h3>
                  <p className="featured-description">{product.description || 'No description available for this product.'}</p>
                  
                  <div className="price-and-rating">
                    <div className="price">
                      ${product.price.toFixed(2)}
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="product-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                  
                  <div className="product-actions">
                    <Link to={`/products/${product.id}`} className="details-button">
                      View Details
                    </Link>
                    <button className="add-to-cart-button">
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* REDESIGNED Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What Our Customers Say</h2>
            <p className="testimonials-subtitle">Read some of the feedback from our happy customers who have experienced our products and services</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">"Absolutely love the selection here. The products are high quality and shipping was incredibly fast! I'll definitely be ordering again in the future."</p>
              <div className="testimonial-author">
                <img src="/placeholder-avatar.png" alt="Jane D." className="author-avatar" />
                <div className="author-info">
                  <h4>Jane D.</h4>
                  <p>Loyal Customer</p>
                  <div className="author-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">"Great prices and amazing customer service! When I had an issue with my order, the team resolved it immediately. I'm very impressed with their dedication to customer satisfaction."</p>
              <div className="testimonial-author">
                <img src="/placeholder-avatar.png" alt="Austin S." className="author-avatar" />
                <div className="author-info">
                  <h4>Austin S.</h4>
                  <p>New Customer</p>
                  <div className="author-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">"The product quality exceeded my expectations! The selection is fantastic, and everything arrived beautifully packaged. I signed up for the deals and have already recommended this site to my friends."</p>
              <div className="testimonial-author">
                <img src="/placeholder-avatar.png" alt="Maria R." className="author-avatar" />
                <div className="author-info">
                  <h4>Maria R.</h4>
                  <p>Repeat Customer</p>
                  <div className="author-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay in the Loop</h2>
            <p>Subscribe to our newsletter to receive exclusive offers, latest product updates, and insider tips directly to your inbox.</p>
            
            <div className="newsletter-features">
              <div className="newsletter-feature">
                <i className="fas fa-check-circle"></i>
                <span>Exclusive deals and promotions</span>
              </div>
              <div className="newsletter-feature">
                <i className="fas fa-check-circle"></i>
                <span>New product announcements</span>
              </div>
              <div className="newsletter-feature">
                <i className="fas fa-check-circle"></i>
                <span>Seasonal sales notifications</span>
              </div>
            </div>
          </div>
          
          <div className="newsletter-form-container">
            <h3 className="newsletter-form-title">Join Our Community</h3>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit" className="newsletter-button">
                <i className="fas fa-paper-plane"></i> Subscribe Now
              </button>
            </form>
            <p className="newsletter-terms">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
