// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state: user and loading/error
  const { userInfo, loading, error } = useSelector((state) => state.user);

  // Local form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If the user is already logged in, navigate away (e.g., to home)
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login thunk
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">Error: {error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="register-redirect">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/register")} className="register-link">
          Register Here
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
