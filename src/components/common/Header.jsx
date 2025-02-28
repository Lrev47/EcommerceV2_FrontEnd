// src/components/Header.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Redux imports removed
import { fetchAllProducts } from "../../redux/slices/productSlice";
import "./styles/header.css";

// 1) Import the logout action
import { logout } from "../../redux/slices/userSlice";

const Header = () => {
  // // const dispatch = useDispatch(); - removed - removed

  // We fetch all products to get categories (if your code does that).
  // useEffect removed

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  // useSelector hook removed - using placeholder values

  // Get product items from store for categories
  const products = useSelector((state) => state.products.items);
  // Ensure products is an array before mapping
  const categories = products && Array.isArray(products) ? [...new Set(products.map((p) => p.category))] : [];

  // 2) Handle logout
  const handleLogout = $3 => {
    console.log("Logout handler called with:", arguments[0]);
    console.log("Would dispatch action:", "logout");
    // Optionally redirect or do anything else you want on logout
  };

  // Mock user info for UI
  const userInfo = null; // Set to an object with user data to simulate logged in state

  return (
    <header>
      <nav className="header-nav">
        {/* Example Logo or Brand */}
        <div className="logo">
          <Link to="/">My Marketplace</Link>
        </div>

        <ul className="nav-links">
          {/* PRODUCTS with dropdown of categories */}
          <li className="dropdown">
            <Link to="/products">Products</Link>
            <div className="dropdown-content">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link key={cat} to={`/products/category/${cat}`}>
                    {cat}
                  </Link>
                ))
              ) : (
                <span style={{ padding: "0.5rem 1rem", display: "block" }}>
                  No categories
                </span>
              )}
            </div>
          </li>

          {/* If user is NOT logged in => show Register/Login */}
          {!userInfo && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}

          {/* If user is logged in => (Optional) show Admin link, etc. */}
          {userInfo && (
            <>
              {/* Example: If user is admin, show admin link:
                <li><Link to="/admin">Admin</Link></li>
              */}
            </>
          )}

          {/* CART link */}
          <li>
            <Link to="/cart" className="cart-link">
              Cart ({cartQuantity})
            </Link>
          </li>

          {/* Profile Dropdown for logged in user */}
          {userInfo && (
            <li className="profile-dropdown">
              <div className="profile-link">
                <img
                  src={
                    userInfo.userImageUrl
                      ? userInfo.userImageUrl
                      : "/default-profile.png"
                  }
                  alt="Profile"
                  className="profile-image"
                />
              </div>

              {/* The dropdown that appears on hover */}
              <div className="profile-dropdown-content">
                <Link to="/account">My Account</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
