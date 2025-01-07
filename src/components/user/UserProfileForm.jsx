// src/components/user/UserProfileForm.jsx
import React, { useState, useEffect } from "react";

/**
 * Props (examples):
 * - initialValues: { firstName, lastName, username, email, gender, etc. } (optional)
 * - onSubmit: function(profileData) => void;
 */
const UserProfileForm = ({ initialValues = {}, onSubmit }) => {
  const [firstName, setFirstName] = useState(initialValues.firstName || "");
  const [lastName, setLastName] = useState(initialValues.lastName || "");
  const [username, setUsername] = useState(initialValues.username || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [gender, setGender] = useState(initialValues.gender || "");

  useEffect(() => {
    // If the parent updates initialValues, sync them
    setFirstName(initialValues.firstName || "");
    setLastName(initialValues.lastName || "");
    setUsername(initialValues.username || "");
    setEmail(initialValues.email || "");
    setGender(initialValues.gender || "");
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      firstName,
      lastName,
      username,
      email,
      gender,
    };
    if (onSubmit) onSubmit(profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-profile-form">
      {/* First Name */}
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      {/* Username */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Gender (optional) */}
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="profile-submit-button">
        Update Profile
      </button>
    </form>
  );
};

export default UserProfileForm;
