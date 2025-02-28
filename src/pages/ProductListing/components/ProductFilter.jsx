import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/productFilter.css';

const ProductFilter = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    rating: false,
    availability: false
  });

  // Get all categories from products
  // useSelector hook removed - using placeholder values
  const allCategories = [...new Set(
    Array.isArray(items) 
      ? items.map(product => product.category).filter(Boolean)
      : []
  )].sort();

  const handleCategoryClick = $3 => {
    console.log("CategoryClick handler called with:", arguments[0]);
    // If we're already on this category, go back to all products
    if (selectedCategory === category) {
      navigate('/products');
    } else {
      navigate(`/products/category/${selectedCategory}`);
    }
  };

  const handlePriceChange = $3 => {
    console.log("PriceChange handler called with:", arguments[0]);
    const value = e.target.value;
    // Only allow numbers and empty values
    if (value === '' || /^\d+$/.test(value)) {
      setPriceRange({
        ...priceRange,
        [type]: value
      });
    }
  };

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const applyPriceFilter = () => {
    // In a real app, this would dispatch an action to filter by price
    console.log('Filter by price:', priceRange);
    // For now, just log the values
  };

  return (
    <div className="product-filter">
      <h2 className="filter-title">Filters</h2>
      
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('categories')}
        >
          <h3>Categories</h3>
          <span className={`expand-icon ${expanded.categories ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expanded.categories && (
          <div className="filter-section-content">
            <ul className="category-list">
              <li 
                className={`category-item ${!category ? 'active' : ''}`}
                onClick={() => navigate('/products')}
              >
                All Products
              </li>
              {allCategories.map((cat) => (
                <li 
                  key={cat} 
                  className={`category-item ${cat === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('price')}
        >
          <h3>Price Range</h3>
          <span className={`expand-icon ${expanded.price ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expanded.price && (
          <div className="filter-section-content">
            <div className="price-inputs">
              <div className="price-input-group">
                <label htmlFor="min-price">Min ($)</label>
                <input
                  type="text"
                  id="min-price"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  placeholder="0"
                />
              </div>
              <div className="price-input-group">
                <label htmlFor="max-price">Max ($)</label>
                <input
                  type="text"
                  id="max-price"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  placeholder="1000"
                />
              </div>
            </div>
            <button 
              className="apply-price-btn"
              onClick={applyPriceFilter}
              disabled={!priceRange.min && !priceRange.max}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('rating')}
        >
          <h3>Rating</h3>
          <span className={`expand-icon ${expanded.rating ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expanded.rating && (
          <div className="filter-section-content">
            <ul className="rating-list">
              {[5, 4, 3, 2, 1].map((star) => (
                <li key={star} className="rating-item">
                  <label>
                    <input type="checkbox" />
                    <span className="star-rating">
                      {[...Array(star)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                      {[...Array(5 - star)].map((_, i) => (
                        <i key={i} className="far fa-star"></i>
                      ))}
                    </span>
                    <span>& Up</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="filter-section">
        <div 
          className="filter-section-header" 
          onClick={() => toggleSection('availability')}
        >
          <h3>Availability</h3>
          <span className={`expand-icon ${expanded.availability ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {expanded.availability && (
          <div className="filter-section-content">
            <ul className="availability-list">
              <li className="availability-item">
                <label>
                  <input type="checkbox" />
                  <span>In Stock</span>
                </label>
              </li>
              <li className="availability-item">
                <label>
                  <input type="checkbox" />
                  <span>Out of Stock</span>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      <button className="clear-filters-btn">
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilter; 