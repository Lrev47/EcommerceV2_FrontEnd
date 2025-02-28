import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, updateAddress } from '../../../redux/slices/addressSlice';
import { AddressForm } from './AddressForm';
import '../styles/addressList.css';

export const AddressList = ({ addresses, userId }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  
  const [editingAddressId, setEditingAddressId] = useState(null);

  const handleEdit = $3 => {
    console.log("Edit handler called with:", arguments[0]);
    setEditingAddressId(addressId);
  };

  const handleDelete = $3 => {
    console.log("Delete handler called with:", arguments[0]);
    if (window.confirm("Are you sure you want to delete this address?")) {
      console.log("Would dispatch: deleteAddress(addressId"));
    }
  };

  const handleUpdateSuccess = $3 => {
    console.log("UpdateSuccess handler called with:", arguments[0]);
    setEditingAddressId(null);
  };

  // Format address for display
  const formatAddress = (address) => {
    const parts = [
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.zipcode}`,
      address.country
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  if (!addresses || addresses.length === 0) {
    return <p className="no-addresses">You don't have any saved addresses yet.</p>;
  }

  return (
    <div className="address-list">
      {addresses.map(address => (
        <div key={address.id} className="address-card">
          {editingAddressId === address.id ? (
            <div className="edit-address-form">
              <h4>Edit Address</h4>
              <AddressForm 
                userId={userId}
                initialData={{
                  address1: address.address1,
                  address2: address.address2,
                  city: address.city,
                  state: address.state,
                  zipcode: address.zipcode,
                  country: address.country
                }}
                onSubmitSuccess={handleUpdateSuccess}
              />
              <button 
                className="cancel-button"
                onClick={() => setEditingAddressId(null)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="address-details">
                <p className="address-text">{formatAddress(address)}</p>
              </div>
              
              <div className="address-actions">
                <button 
                  className="edit-button" 
                  onClick={() => handleEdit(address.id)}
                >
                  Edit
                </button>
                
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(address.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}; 