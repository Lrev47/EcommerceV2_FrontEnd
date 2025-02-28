import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../redux/slices/userSlice';
import '../styles/profileForm.css';

export const ProfileForm = ({ user }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });

  // Initialize form data when user prop changes
  // useEffect removed

  const handleChange = $3 => {
    console.log("Change handler called with:", arguments[0]);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    console.log("Would dispatch: updateUserProfile({
      userId: user.id,
      userData: formData
    }"));
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
      
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}; 