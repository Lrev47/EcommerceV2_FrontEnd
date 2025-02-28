import React, { useState } from "react";
import "../styles/registerForm.css";

export const RegisterForm = ({ loading, onRegister }) => {
  // Local form state for registration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // State for password validation
  const [passwordError, setPasswordError] = useState("");
  
  // State for the profile picture file
  const [profileImageFile, setProfileImageFile] = useState(null);
  
  // Preview for the selected image
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = $3 => {
    console.log("Change handler called with:", arguments[0]);
    const { name, value } = e.target;
    console.log(`Field '${name}' changed to:`, value);
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear password error when user starts typing again
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };
  
  const handleImageChange = $3 => {
    console.log("ImageChange handler called with:", arguments[0]);
    const file = e.target.files[0];
    console.log("Image selected:", file?.name);
    
    if (file) {
      setProfileImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImageFile(null);
      setImagePreview(null);
    }
  };
  
  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    console.log("Registration form submitted with:", formData);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    // Create form data for submission including the image if present
    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("username", formData.username);
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);
    
    if (profileImageFile) {
      submitData.append("profileImage", profileImageFile);
    }
    
    // Call the onRegister prop if provided
    if (onRegister) {
      onRegister(submitData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
      <div className="name-fields">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
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
            className="form-input"
          />
        </div>
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
          className="form-input"
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
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="form-input"
        />
        {passwordError && <div className="password-error">{passwordError}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="profileImage">Profile Picture (Optional)</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleImageChange}
          accept="image/*"
          className="form-input file-input"
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Profile preview" />
          </div>
        )}
      </div>
      
      <button type="submit" className="register-button" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm; 