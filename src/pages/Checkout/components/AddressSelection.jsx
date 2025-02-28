import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../../redux/slices/addressSlice";
import "../styles/addressSelection.css";

const AddressSelection = ({ userId, onSelectAddress, selectedAddressId }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  // useEffect removed

  // useEffect removed

  const handleAddressSelect = $3 => {
    console.log("AddressSelect handler called with:", arguments[0]);
    onSelectAddress(addressId);
  };

  if (loading) {
    return <div className="address-loading">Loading addresses...</div>;
  }

  if (error) {
    return <div className="address-error">Error loading addresses: {error}</div>;
  }

  return (
    <div className="address-selection">
      {addresses.length === 0 ? (
        <div className="no-addresses">
          <p>You don't have any saved addresses.</p>
          <button 
            className="add-address-btn"
            onClick={() => setShowAddressForm(true)}
          >
            Add a New Address
          </button>
        </div>
      ) : (
        <>
          <div className="address-list">
            {addresses.map((address) => (
              <div 
                key={address.id}
                className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <div className="address-selection-indicator">
                  <input 
                    type="radio" 
                    name="addressId" 
                    checked={selectedAddressId === address.id}
                    onChange={() => handleAddressSelect(address.id)}
                    id={`address-${address.id}`}
                  />
                </div>
                <div className="address-details">
                  <div className="address-name">{address.fullName}</div>
                  <div className="address-line">{address.streetAddress}</div>
                  <div className="address-line">
                    {address.city}, {address.state} {address.zipCode}
                  </div>
                  <div className="address-line">{address.country}</div>
                  <div className="address-phone">{address.phoneNumber}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="add-address-btn"
            onClick={() => setShowAddressForm(true)}
          >
            Add a New Address
          </button>
        </>
      )}

      {showAddressForm && (
        <div className="address-form-overlay">
          <div className="address-form-container">
            <h3>Add New Address</h3>
            <p>This would be a complete address form component.</p>
            <div className="address-form-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddressForm(false)}
              >
                Cancel
              </button>
              <button className="save-btn">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelection; 