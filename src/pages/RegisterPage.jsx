// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/LoginPage.css"; // Reusing the auth styles

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  // Local form state for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  useEffect(() => {
    // If already logged in, redirect to home
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // Handle profile image selection with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData to support file upload
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // Append the file only if user selected one
    if (profileImageFile) {
      formData.append("userImage", profileImageFile);
    }

    dispatch(registerUser(formData));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <img src="/Electronics.png" alt="My Marketplace" className="brand-logo" />
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join our marketplace community</p>
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
              {/* Profile picture preview */}
              {profileImagePreview && (
                <div className="profile-preview-container">
                  <img 
                    src={profileImagePreview} 
                    alt="Profile Preview" 
                    className="profile-preview"
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
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
                    placeholder="Create a strong password"
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

              <div className="form-group">
                <label htmlFor="userImage" className="form-label">Profile Picture (Optional)</label>
                <input
                  type="file"
                  id="userImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-input file-input"
                />
                <small className="input-helper">Upload a profile picture (JPG, PNG, max 5MB)</small>
              </div>

              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading-button' : ''}`} 
                disabled={loading}
              >
                {loading ? (
                  <span>Creating account...</span>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    <span>Create Account</span>
                  </>
                )}
              </button>

              <div className="auth-divider">
                <span>Or register with</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-button google-login">
                  <i className="fab fa-google social-icon"></i>
                  <span>Sign up with Google</span>
                </button>
                <button type="button" className="social-button facebook-login">
                  <i className="fab fa-facebook-f social-icon"></i>
                  <span>Sign up with Facebook</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account? 
              <Link to="/login"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
