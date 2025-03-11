// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { logout } from "../../redux/slices/userSlice";
import "../../styles/components/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);
  
  // Close the mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Focus the search input when shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Fetch products for categories
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page
      window.location.href = `/products/search?q=${encodeURIComponent(searchQuery)}`;
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const { items: products, loading } = useSelector((state) => state.products);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { userInfo } = useSelector((state) => state.user);
  
  // Get unique categories and sort them alphabetically
  const categories = [...new Set(products.map((p) => p.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  
  // Check if the current page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-nav">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src="/Electronics.png" alt="My Marketplace" />
              <span>MyMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {/* Categories Dropdown */}
            <div className="dropdown-wrapper">
              <Link 
                to="/products" 
                className={isActive('/products') ? 'active' : ''}
              >
                Shop
                <i className="fas fa-chevron-down"></i>
              </Link>
              <div className="dropdown-content">
                <div className="dropdown-grid">
                  {loading ? (
                    <div className="dropdown-loading">
                      <i className="fas fa-spinner fa-spin"></i> Loading categories...
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link 
                        key={category} 
                        to={`/products/category/${category}`}
                        className="dropdown-item"
                      >
                        <span>{category}</span>
                        <i className="fas fa-angle-right"></i>
                      </Link>
                    ))
                  ) : (
                    <div className="dropdown-empty">No categories found</div>
                  )}
                </div>
                <div className="dropdown-footer">
                  <Link to="/products" className="view-all">
                    View All Products <i className="fas fa-long-arrow-alt-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Navigation Links */}
            <Link 
              to="/deals" 
              className={isActive('/deals') ? 'active' : ''}
            >
              Deals
            </Link>
            
            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link>

            {/* Mobile Only: Login/Register Links */}
            <div className="mobile-only">
              {!userInfo ? (
                <>
                  <Link to="/login" className="mobile-auth-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                  <Link to="/register" className="mobile-auth-link">
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/account" className="mobile-auth-link">
                    <i className="fas fa-user-circle"></i> My Account
                  </Link>
                  <button onClick={handleLogout} className="mobile-auth-link logout-button">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Header Actions (Search, Cart, Account) */}
          <div className="header-actions">
            {/* Search Button/Form */}
            <div className="search-container">
              <button 
                className="action-button search-toggle"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Toggle search"
              >
                <i className={`fas ${showSearch ? 'fa-times' : 'fa-search'}`}></i>
              </button>
              
              {showSearch && (
                <form className="search-form" onSubmit={handleSearch}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="search-input"
                  />
                  <button type="submit" className="search-submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              )}
            </div>

            {/* Cart Link */}
            <Link to="/cart" className="action-button cart-button">
              <i className="fas fa-shopping-cart"></i>
              {cartQuantity > 0 && (
                <span className="cart-badge">{cartQuantity}</span>
              )}
            </Link>

            {/* Desktop: Login/Profile Dropdown */}
            <div className="desktop-only">
              {!userInfo ? (
                <div className="dropdown-wrapper auth-dropdown">
                  <button className="action-button">
                    <i className="fas fa-user"></i>
                  </button>
                  <div className="dropdown-content auth-menu">
                    <Link to="/login" className="dropdown-item">
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Login</span>
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      <i className="fas fa-user-plus"></i>
                      <span>Register</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="dropdown-wrapper profile-dropdown">
                  <button className="action-button profile-button">
                    {userInfo.userImageUrl ? (
                      <img 
                        src={userInfo.userImageUrl} 
                        alt={userInfo.firstName} 
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-initial">
                        {userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </button>
                  <div className="dropdown-content profile-menu">
                    <div className="profile-header">
                      <div className="profile-info">
                        <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                        <p>{userInfo.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/account" className="dropdown-item">
                      <i className="fas fa-user-circle"></i>
                      <span>My Account</span>
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <i className="fas fa-box"></i>
                      <span>My Orders</span>
                    </Link>
                    <Link to="/wishlist" className="dropdown-item">
                      <i className="fas fa-heart"></i>
                      <span>Wishlist</span>
                    </Link>
                    {userInfo.isAdmin && (
                      <Link to="/admin/dashboard" className="dropdown-item">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
