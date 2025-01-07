// src/components/user/AddressForm.jsx
import React, { useState } from "react";

/**
 * Props (examples):
 * - onSubmit: function(addressData) => void;
 * - initialValues: { label, address1, address2, city, state, zipcode, country } (optional)
 */
const AddressForm = ({ onSubmit, initialValues = {} }) => {
  const [label, setLabel] = useState(initialValues.label || "");
  const [address1, setAddress1] = useState(initialValues.address1 || "");
  const [address2, setAddress2] = useState(initialValues.address2 || "");
  const [city, setCity] = useState(initialValues.city || "");
  const [state, setState] = useState(initialValues.state || "");
  const [zipcode, setZipcode] = useState(initialValues.zipcode || "");
  const [country, setCountry] = useState(initialValues.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect the form data
    const addressData = {
      label,
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
    };
    // Call the parent-provided onSubmit
    if (onSubmit) onSubmit(addressData);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      {/* Label */}
      <div className="form-group">
        <label htmlFor="label">Label (Home, Work, etc.)</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Home or Office"
        />
      </div>

      {/* Address 1 */}
      <div className="form-group">
        <label htmlFor="address1">Address Line 1</label>
        <input
          type="text"
          id="address1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
      </div>

      {/* Address 2 (optional) */}
      <div className="form-group">
        <label htmlFor="address2">Address Line 2</label>
        <input
          type="text"
          id="address2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      {/* State */}
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      {/* Zipcode */}
      <div className="form-group">
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
      </div>

      {/* Country */}
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="address-submit-button">
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;
