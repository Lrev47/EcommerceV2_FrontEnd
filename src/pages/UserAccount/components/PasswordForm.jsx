import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../../redux/slices/userSlice';
import '../styles/passwordForm.css';

export const PasswordForm = ({ userId }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [passwordError, setPasswordError] = useState('');

  const handleChange = $3 => {
    console.log("Change handler called with:", arguments[0]);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the password match error when user types in confirm password field
    if (name === 'confirmPassword' || name === 'newPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    
    // Validate password match
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    // Validate password length
    if (formData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    // Dispatch action to update password
    console.log("Would dispatch: updateUserPassword({
      userId,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    }")).then(() => {
      // Reset form after successful update
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    });
  };

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="form-control"
          minLength="8"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      
      {passwordError && (
        <div className="password-error">{passwordError}</div>
      )}
      
      {error && <div className="form-error">{error}</div>}

      <button 
        type="submit" 
        className="submit-button"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}; 