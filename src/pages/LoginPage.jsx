// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);

  // State for form fields
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("password1");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    // If already logged in, redirect to home
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, rememberMe }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <img src="/Electronics.png" alt="My Marketplace" className="brand-logo" />
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to access your account</p>
          </div>

          {/* Body */}
          <div className="auth-body">
            {error && (
              <div className="auth-alert auth-alert-error">
                <span className="alert-icon">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  autoComplete="username"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="remember-forgot">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkbox-container"></span>
                  <span className="remember-label">Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading-button' : ''}`} 
                disabled={loading}
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="auth-divider">
                <span>Or continue with</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-button google-login">
                  <i className="fab fa-google social-icon"></i>
                  <span>Sign in with Google</span>
                </button>
                <button type="button" className="social-button facebook-login">
                  <i className="fab fa-facebook-f social-icon"></i>
                  <span>Sign in with Facebook</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/register"> Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
