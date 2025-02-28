// src/pages/UserAccount/UserAccountPage.jsx
import React, { useEffect, useState } from "react";
// Redux imports removed
import { updateUserProfile, getCurrentUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { 
  fetchAddressesByUser,
  createAddress,
  deleteAddress,
  updateAddress
} from "../../redux/slices/addressSlice";

// Import components
import { ProfileForm } from "./components/ProfileForm";
import { PasswordForm } from "./components/PasswordForm";
import { AddressForm } from "./components/AddressForm";
import { AddressList } from "./components/AddressList";

// Import styles
import "./styles/userAccount.css";

const UserAccountPage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  const navigate = useNavigate();

  // useSelector hook removed - using placeholder values
  // useSelector hook removed - using placeholder values

  // useEffect removed

  if (!currentUser) {
    return null; // or a loading spinner
  }

  return (
    <div className="user-account-page">
      <h1>My Account</h1>

      {/* Display user image */}
      <section className="profile-image-section">
        {currentUser.userImageUrl ? (
          <img
            src={currentUser.userImageUrl}
            alt="User Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">
            {currentUser.firstName ? currentUser.firstName.charAt(0) : ''}
            {currentUser.lastName ? currentUser.lastName.charAt(0) : ''}
          </div>
        )}
      </section>

      {error && <div className="update-error">Error: {error}</div>}

      {/* Profile Form Component */}
      <section className="account-section">
        <h2>Update Profile</h2>
        <ProfileForm user={currentUser} />
      </section>

      {/* Password Form Component */}
      <section className="account-section">
        <h2>Change Password</h2>
        <PasswordForm userId={currentUser.id} />
      </section>

      {/* Address Management Section */}
      <section className="account-section">
        <h2>Manage Addresses</h2>
        
        {/* New Address Form */}
        <h3>Add New Address</h3>
        <AddressForm userId={currentUser.id} />
        
        {/* Existing Addresses */}
        <h3>Your Addresses</h3>
        {addressLoading ? (
          <p>Loading addresses...</p>
        ) : (
          <AddressList 
            addresses={addresses} 
            userId={currentUser.id}
          />
        )}
      </section>
    </div>
  );
};

export default UserAccountPage; 