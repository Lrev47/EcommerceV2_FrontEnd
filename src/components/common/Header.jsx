// src/components/Header.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/slices/productSlice"; // import your thunk

const Header = () => {
  const dispatch = useDispatch();

  // We fetch all products to get categories (assuming it's cheap enough).
  // If you already fetch them on some parent, you can skip or conditionally fetch.
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { userInfo } = useSelector((state) => state.user);

  // Get product items from store
  const products = useSelector((state) => state.products.items);

  // Derive unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <header>
      <nav className="header-nav">
        {/* Example Logo or Brand */}
        <div className="logo">
          <Link to="/">My Brand</Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          {/* PRODUCTS with dropdown */}
          <li className="dropdown">
            <Link to="/products">Products</Link>
            {/* Hover dropdown showing categories */}
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

          {/* Show these links ONLY if NOT logged in */}
          {!userInfo && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}

          {/* Show these links ONLY if logged in */}
          {userInfo && <li>{/* <Link to="/admin">Admin</Link> */}</li>}

          {/* Cart link with quantity */}
          <li>
            <Link to="/cart" className="cart-link">
              Cart ({cartQuantity})
            </Link>
          </li>

          {/* Profile image or login button on the far right */}
          <li>
            {userInfo ? (
              <Link to="/account" className="profile-link">
                <img
                  src={
                    userInfo.userImageUrl
                      ? userInfo.userImageUrl
                      : "/default-profile.png"
                  }
                  alt="Profile"
                  className="profile-image"
                />
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
