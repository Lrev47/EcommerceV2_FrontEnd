import React, { useState } from 'react';
import "../styles/loginForm.css";

const LoginForm = ({ onSubmit, loading }) => {
  // Form state with empty initial values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    console.log('Login form submitted with:', { email, password });
    
    // Call the onSubmit handler if provided
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
  );
};

export default LoginForm; 