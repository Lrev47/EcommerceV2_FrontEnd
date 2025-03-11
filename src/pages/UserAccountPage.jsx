// src/pages/UserAccountPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/UserAccountPage.css";

import {
  fetchAddressesByUser,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../redux/slices/addressSlice";

import { getOrdersByUser } from "../redux/slices/orderSlice";

const UserAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);
  const { items: addressList, loading: addressLoading } = useSelector(
    (state) => state.address
  );

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");
  
  // -------------- BASIC USER FIELDS --------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");

  // -------------- PASSWORD FIELDS --------------
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // -------------- ADDRESS FIELDS --------------
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  
  // -------------- EDITING ADDRESS FIELDS --------------
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editingFields, setEditingFields] = useState({
    address1: "",
    address2: "",
    city: "",
    stateVal: "",
    zipcode: "",
    country: "",
    isDefault: false,
  });

  // -------------- FORM STATES --------------
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  
  // Add a new state for expanded orders in the orders tab
  const [expandedOrders, setExpandedOrders] = useState([]);

  // If user is not logged in, redirect to /login
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      // Populate the user profile form fields
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setUsername(userInfo.username || "");
      setEmail(userInfo.email || "");
      setUserImageUrl(userInfo.userImageUrl || "");

      // fetch addresses for this user
      dispatch(fetchAddressesByUser(userInfo.id));
    }
  }, [userInfo, navigate, dispatch]);

  // Reset form success message after 3 seconds
  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => {
        setFormSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  // Add useEffect to fetch user orders when tab changes
  useEffect(() => {
    if (activeTab === 'orders' && userInfo) {
      dispatch(getOrdersByUser(userInfo.id));
    }
  }, [activeTab, userInfo, dispatch]);

  // -------------- HANDLERS --------------

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Update the user's basic profile info
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userInfo.id,
        firstName,
        lastName,
        username,
        email,
        userImageUrl,
      })
    ).then(() => {
      setShowProfileForm(false);
      setFormSuccess("Profile updated successfully");
    });
  };

  // Change password
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    dispatch(
      updateUser({
        id: userInfo.id,
        oldPassword,
        password: newPassword,
      })
    ).then(() => {
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFormSuccess("Password updated successfully");
    });
  };

  // Add new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(
      createAddress({
        userId: userInfo.id,
        address1,
        address2,
        city,
        state: stateVal,
        zipcode,
        country,
        isDefault: isDefaultAddress,
      })
    ).then(() => {
      // Clear the form
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateVal("");
      setZipcode("");
      setCountry("");
      setIsDefaultAddress(false);
      setShowAddressForm(false);
      setFormSuccess("Address added successfully");
    });
  };

  // Delete an address
  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(addressId)).then(() => {
        setFormSuccess("Address deleted successfully");
      });
    }
  };

  // Start editing an address
  const handleEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setEditingFields({
      address1: addr.address1,
      address2: addr.address2 || "",
      city: addr.city,
      stateVal: addr.state || "",
      zipcode: addr.zipcode,
      country: addr.country,
      isDefault: addr.isDefault || false,
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingAddressId(null);
    setEditingFields({
      address1: "",
      address2: "",
      city: "",
      stateVal: "",
      zipcode: "",
      country: "",
      isDefault: false,
    });
  };

  // Save updated address
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    dispatch(
      updateAddress({
        addressId: editingAddressId,
        addressData: {
          address1: editingFields.address1,
          address2: editingFields.address2,
          city: editingFields.city,
          state: editingFields.stateVal,
          zipcode: editingFields.zipcode,
          country: editingFields.country,
          isDefault: editingFields.isDefault,
        },
      })
    ).then(() => {
      setEditingAddressId(null);
      setEditingFields({
        address1: "",
        address2: "",
        city: "",
        stateVal: "",
        zipcode: "",
        country: "",
        isDefault: false,
      });
      setFormSuccess("Address updated successfully");
    });
  };

  // Add toggle function for expand/collapse orders
  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prevExpanded) => {
      if (prevExpanded.includes(orderId)) {
        return prevExpanded.filter((id) => id !== orderId);
      } else {
        return [...prevExpanded, orderId];
      }
    });
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  if (!userInfo) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="account-loading">
            <div className="loading-spinner"></div>
            <p>Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1 className="account-title">My Account</h1>
          <p className="account-subtitle">Manage your account details and preferences</p>
        </div>

        <div className="account-layout">
          {/* Sidebar Navigation */}
          <div className="account-sidebar">
            <div className="user-info">
              {userImageUrl ? (
                <img src={userImageUrl} alt={`${firstName}'s profile`} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">
                  {firstName && lastName ? 
                    `${firstName.charAt(0)}${lastName.charAt(0)}` : 
                    username.charAt(0).toUpperCase()}
                </div>
              )}
              <h3 className="user-name">{firstName} {lastName}</h3>
              <p className="user-email">{email}</p>
            </div>

            <div className="account-nav">
              <a 
                href="#profile" 
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabChange('profile'); }}
              >
                <i className="fas fa-user nav-icon"></i>
                Profile Information
              </a>
              <a 
                href="#addresses" 
                className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabChange('addresses'); }}
              >
                <i className="fas fa-map-marker-alt nav-icon"></i>
                Address Book
              </a>
              <a 
                href="#password" 
                className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabChange('password'); }}
              >
                <i className="fas fa-lock nav-icon"></i>
                Change Password
              </a>
              <a 
                href="#orders" 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabChange('orders'); }}
              >
                <i className="fas fa-shopping-bag nav-icon"></i>
                Order History
              </a>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="account-content">
            {/* Success message */}
            {formSuccess && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <span>{formSuccess}</span>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2 className="content-title">Profile Information</h2>
                  {!showProfileForm && (
                    <button 
                      className="edit-button"
                      onClick={() => setShowProfileForm(true)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  )}
                </div>

                {showProfileForm ? (
                  <form onSubmit={handleProfileUpdate} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-input"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setShowProfileForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-button" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-details">
                    <div className="detail-row">
                      <div className="detail-group">
                        <span className="detail-label">First Name</span>
                        <span className="detail-value">{firstName}</span>
                      </div>
                      <div className="detail-group">
                        <span className="detail-label">Last Name</span>
                        <span className="detail-value">{lastName}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-group">
                        <span className="detail-label">Username</span>
                        <span className="detail-value">{username}</span>
                      </div>
                      <div className="detail-group">
                        <span className="detail-label">Email Address</span>
                        <span className="detail-value">{email}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Address Book Tab */}
            {activeTab === 'addresses' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2 className="content-title">Address Book</h2>
                  {!showAddressForm && !editingAddressId && (
                    <button 
                      className="add-button"
                      onClick={() => setShowAddressForm(true)}
                    >
                      <i className="fas fa-plus"></i> Add Address
                    </button>
                  )}
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="address-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Address Line 1</label>
                        <input
                          type="text"
                          className="form-input"
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                          required
                          placeholder="Street address, P.O. box"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Address Line 2</label>
                        <input
                          type="text"
                          className="form-input"
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                          placeholder="Apartment, suite, unit, building, floor, etc."
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-input"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State/Province</label>
                        <input
                          type="text"
                          className="form-input"
                          value={stateVal}
                          onChange={(e) => setStateVal(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">ZIP/Postal Code</label>
                        <input
                          type="text"
                          className="form-input"
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-input"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={isDefaultAddress}
                          onChange={(e) => setIsDefaultAddress(e.target.checked)}
                        />
                        <span className="checkbox-text">Set as default address</span>
                      </label>
                    </div>
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-button" disabled={addressLoading}>
                        {addressLoading ? 'Adding...' : 'Add Address'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Edit Address Form */}
                {editingAddressId && (
                  <form onSubmit={handleUpdateAddress} className="address-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Address Line 1</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.address1}
                          onChange={(e) => setEditingFields({...editingFields, address1: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Address Line 2</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.address2}
                          onChange={(e) => setEditingFields({...editingFields, address2: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.city}
                          onChange={(e) => setEditingFields({...editingFields, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State/Province</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.stateVal}
                          onChange={(e) => setEditingFields({...editingFields, stateVal: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">ZIP/Postal Code</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.zipcode}
                          onChange={(e) => setEditingFields({...editingFields, zipcode: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingFields.country}
                          onChange={(e) => setEditingFields({...editingFields, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={editingFields.isDefault}
                          onChange={(e) => setEditingFields({...editingFields, isDefault: e.target.checked})}
                        />
                        <span className="checkbox-text">Set as default address</span>
                      </label>
                    </div>
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-button" disabled={addressLoading}>
                        {addressLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Address List */}
                {!showAddressForm && !editingAddressId && (
                  <div className="address-list">
                    {addressList.length === 0 ? (
                      <div className="no-addresses">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>You haven't added any addresses yet.</p>
                      </div>
                    ) : (
                      addressList.map((addr) => (
                        <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                          {addr.isDefault && <span className="default-badge">Default</span>}
                          <div className="address-details">
                            <p>{addr.address1}</p>
                            {addr.address2 && <p>{addr.address2}</p>}
                            <p>{addr.city}, {addr.state} {addr.zipcode}</p>
                            <p>{addr.country}</p>
                          </div>
                          <div className="address-actions">
                            <button 
                              className="address-action edit-action"
                              onClick={() => handleEditAddress(addr)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="address-action delete-action"
                              onClick={() => handleDeleteAddress(addr.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    {!showAddressForm && addressList.length > 0 && (
                      <div className="add-address-card" onClick={() => setShowAddressForm(true)}>
                        <div className="add-address-icon">
                          <i className="fas fa-plus"></i>
                        </div>
                        <span className="add-address-text">Add a new address</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2 className="content-title">Change Password</h2>
                </div>
                
                <form onSubmit={handlePasswordUpdate} className="password-form">
                  {passwordError && (
                    <div className="error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      <span>{passwordError}</span>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-input"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength="6"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-input"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        minLength="6"
                      />
                    </div>
                  </div>
                  <div className="password-requirements">
                    <p>Password requirements:</p>
                    <ul>
                      <li>Minimum 6 characters</li>
                      <li>Include both letters and numbers for better security</li>
                    </ul>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-button" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2 className="content-title">Order History</h2>
                  <Link to="/orders" className="view-all-btn">
                    View All Orders <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                
                {/* Orders loading state */}
                {loading ? (
                  <div className="account-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your orders...</p>
                  </div>
                ) : error ? (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Error loading orders: {error}</span>
                  </div>
                ) : userInfo && state.orders && state.orders.userOrders && 
                  state.orders.userOrders.length > 0 ? (
                  <div className="orders-preview">
                    {/* Show the 3 most recent orders */}
                    {state.orders.userOrders.slice(0, 3).map((order) => {
                      const isExpanded = expandedOrders.includes(order.id);
                      return (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div className="order-info">
                              <span className="order-label">Order ID</span>
                              <span className="order-value">{order.id}</span>
                            </div>
                            <div className="order-info">
                              <span className="order-label">Date</span>
                              <span className="order-value">{formatDate(order.createdAt)}</span>
                            </div>
                            <div className="order-info">
                              <span className="order-label">Total</span>
                              <span className="order-value">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="order-info">
                              <span className="order-label">Status</span>
                              <span className={`order-status ${getStatusBadgeClass(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className={`order-body ${isExpanded ? 'expanded' : ''}`}>
                            {isExpanded && order.orderItems && order.orderItems.length > 0 && (
                              <div className="order-items">
                                {order.orderItems.map((item) => (
                                  <div key={item.id} className="order-item">
                                    <img 
                                      src={item.product?.imageUrl || "/images/placeholder.png"} 
                                      alt={item.product?.name} 
                                      className="order-item-image"
                                    />
                                    <div className="order-item-details">
                                      <Link to={`/product/${item.product?.id}`} className="order-item-name">
                                        {item.product?.name}
                                      </Link>
                                      <div className="order-item-info">
                                        <span className="order-item-price">${item.price.toFixed(2)}</span>
                                        <span className="order-item-quantity">× {item.quantity}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="order-footer">
                            <button 
                              className="expand-btn" 
                              onClick={() => toggleOrderExpand(order.id)}
                              aria-label={isExpanded ? "Collapse order details" : "Expand order details"}
                            >
                              {isExpanded ? (
                                <>View less <i className="fas fa-chevron-up"></i></>
                              ) : (
                                <>View details <i className="fas fa-chevron-down"></i></>
                              )}
                            </button>

                            <div className="order-actions">
                              <Link to={`/order/${order.id}`} className="order-action view-details-btn">
                                <i className="fas fa-file-alt"></i> Order Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="view-all-orders">
                      <Link to="/orders" className="view-all-orders-link">
                        View All Orders <i className="fas fa-long-arrow-alt-right"></i>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="orders-empty">
                    <i className="fas fa-shopping-bag"></i>
                    <p>You haven't placed any orders yet.</p>
                    <a href="/products" className="shop-now-button">Start Shopping</a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
