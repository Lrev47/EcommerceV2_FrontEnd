// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

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

  // New state for the profile picture file
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    // If already logged in, redirect to home
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

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
    <div className="register-page-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="register-form">
        {error && <div className="register-error">Error: {error}</div>}

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
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
          <label htmlFor="lastName">Last Name</label>
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

        <div className="form-group">
          <label htmlFor="username">Username</label>
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

        {/* Gender field removed — no longer needed */}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {/* New file input for the user profile image */}
        <div className="form-group">
          <label htmlFor="userImage">Profile Picture (Optional)</label>
          <input
            type="file"
            id="userImage"
            accept="image/*"
            onChange={(e) => setProfileImageFile(e.target.files[0])}
            className="form-input"
          />
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <div className="login-redirect">
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")} className="login-link">
          Login Here
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
