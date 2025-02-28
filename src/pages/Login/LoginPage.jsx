import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import "./styles/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Placeholder states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = $3 => {
    console.log("Login handler called with:", arguments[0]);
    console.log('Login attempted with:', { email, password });
    
    // Reset error state
    setError(null);
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, simulate successful login
      if (email && password) {
        console.log('Login successful!');
        
        // Store mock token in localStorage to simulate authentication
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({ id: 1, email, name: 'User' }));
        
        // Navigate to home page
        navigate('/');
      } else {
        // Show error if email or password is missing
        setError('Email and password are required');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {error && (
        <div className="login-error">
          {typeof error === 'object' 
            ? error.message || JSON.stringify(error) 
            : error}
        </div>
      )}
      <LoginForm onSubmit={handleLogin} loading={loading} />
      
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