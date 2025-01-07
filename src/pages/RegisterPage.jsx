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
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // If already logged in, redirect to home
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch register thunk
    dispatch(
      registerUser({
        firstName,
        lastName,
        username,
        gender,
        email,
        password,
      })
    );
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

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-input"
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            {/* Adjust as needed */}
          </select>
        </div>

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
