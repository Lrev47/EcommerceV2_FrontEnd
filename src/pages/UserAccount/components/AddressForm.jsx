import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../../redux/slices/addressSlice';
import '../styles/addressForm.css';

export const AddressForm = ({ userId, initialData, onSubmitSuccess }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  
  const [formData, setFormData] = useState({
    address1: initialData?.address1 || '',
    address2: initialData?.address2 || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipcode: initialData?.zipcode || '',
    country: initialData?.country || 'US',
  });

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
    
    const addressData = {
      userId,
      ...formData
    };
    
    console.log("Would dispatch: createAddress(addressData"))
      .then(() => {
        // Reset form after successful submission
        if (!initialData) {
          setFormData({
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
            country: 'US',
          });
        }
        
        // Call the success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      });
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="address1">Address Line 1</label>
        <input
          type="text"
          id="address1"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Street address, P.O. box, company name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address2">Address Line 2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          className="form-control"
          placeholder="Apartment, suite, unit, building, floor, etc."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="zipcode">ZIP/Postal Code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            className="form-control"
            pattern="[0-9]+"
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="UK">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={loading}
      >
        {loading ? 'Saving...' : initialData ? 'Update Address' : 'Add Address'}
      </button>
    </form>
  );
}; 