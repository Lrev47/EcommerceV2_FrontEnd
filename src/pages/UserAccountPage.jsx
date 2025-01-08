// src/pages/UserAccountPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

import {
  fetchAddressesByUser,
  createAddress,
  deleteAddress,
  updateAddress, // <--- ensure you import updateAddress from your slice
} from "../redux/slices/addressSlice";

const UserAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);
  const { items: addressList, loading: addressLoading } = useSelector(
    (state) => state.address
  );

  // -------------- BASIC USER FIELDS --------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // We keep userImageUrl in state for display only (not editable).
  const [userImageUrl, setUserImageUrl] = useState("");

  // -------------- PASSWORD FIELDS --------------
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // -------------- ADDRESS FIELDS (NEW) --------------
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  // -------------- EDITING ADDRESS FIELDS --------------
  // We track which address (if any) is currently being edited
  const [editingAddressId, setEditingAddressId] = useState(null);
  // We'll store the fields in local state when editing
  const [editingFields, setEditingFields] = useState({
    address1: "",
    address2: "",
    city: "",
    stateVal: "",
    zipcode: "",
    country: "",
  });

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

  // -------------- HANDLERS --------------

  // Update the user’s basic profile info
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userInfo.id,
        firstName,
        lastName,
        username,
        email,
        userImageUrl, // Not editable, but if you want to keep the existing value
      })
    );
  };

  // Change password
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(
      updateUser({
        id: userInfo.id,
        oldPassword,
        password: newPassword,
      })
    );
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
      })
    ).then(() => {
      // Clear the new-address form
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateVal("");
      setZipcode("");
      setCountry("");
    });
  };

  // Delete an address
  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId));
  };

  // ---------------- EDIT ADDRESS LOGIC ----------------
  // 1) Start editing an address
  const handleEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setEditingFields({
      address1: addr.address1,
      address2: addr.address2 || "",
      city: addr.city,
      stateVal: addr.state || "",
      zipcode: addr.zipcode,
      country: addr.country,
    });
  };

  // 2) Cancel editing
  const handleCancelEdit = () => {
    setEditingAddressId(null);
    setEditingFields({
      address1: "",
      address2: "",
      city: "",
      stateVal: "",
      zipcode: "",
      country: "",
    });
  };

  // 3) Save updated address
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    // dispatch the update
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
        },
      })
    ).then(() => {
      // reset editing states
      setEditingAddressId(null);
      setEditingFields({
        address1: "",
        address2: "",
        city: "",
        stateVal: "",
        zipcode: "",
        country: "",
      });
    });
  };

  if (!userInfo) {
    return null; // or a loading spinner
  }

  return (
    <div className="user-account-page">
      <h1>My Account</h1>

      {/* ---------- Display user image at the top ---------- */}
      <section
        className="profile-image-section"
        style={{ marginBottom: "1rem" }}
      >
        {userImageUrl ? (
          <img
            src={userImageUrl}
            alt="User Profile"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        ) : (
          <p>No profile image available.</p>
        )}
      </section>

      {error && <div className="update-error">Error: {error}</div>}

      {/* ---------- Basic Profile Form ---------- */}
      <section>
        <h2>Update Profile</h2>
        <form onSubmit={handleProfileUpdate} className="user-account-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </section>

      {/* ---------- Password Update Form ---------- */}
      <section>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordUpdate} className="password-update-form">
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* ---------- Addresses Section ---------- */}
      <section>
        <h2>My Addresses</h2>

        {addressLoading && <p>Loading addresses...</p>}

        {/* If user has addresses, list them out */}
        {!addressLoading && addressList && addressList.length > 0 ? (
          <ul>
            {addressList.map((addr) => {
              // If this address is being edited
              if (editingAddressId === addr.id) {
                return (
                  <li key={addr.id} style={{ marginBottom: "0.5rem" }}>
                    <form onSubmit={handleUpdateAddress}>
                      {/* Address 1 */}
                      <div className="form-group">
                        <label>Address 1</label>
                        <input
                          type="text"
                          value={editingFields.address1}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              address1: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      {/* Address 2 */}
                      <div className="form-group">
                        <label>Address 2</label>
                        <input
                          type="text"
                          value={editingFields.address2}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              address2: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* City */}
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={editingFields.city}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              city: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      {/* State */}
                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          value={editingFields.stateVal}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              stateVal: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* Zipcode */}
                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          value={editingFields.zipcode}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              zipcode: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      {/* Country */}
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          value={editingFields.country}
                          onChange={(e) =>
                            setEditingFields({
                              ...editingFields,
                              country: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <button type="submit">Save</button>
                      <button type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </form>
                  </li>
                );
              } else {
                // Normal display of address (not editing)
                return (
                  <li key={addr.id} style={{ marginBottom: "0.5rem" }}>
                    {addr.address1}, {addr.city}, {addr.state}, {addr.zipcode},{" "}
                    {addr.country}{" "}
                    <button
                      type="button"
                      onClick={() => handleEditAddress(addr)}
                    >
                      Edit
                    </button>{" "}
                    <button onClick={() => handleDeleteAddress(addr.id)}>
                      Delete
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          <p>No addresses found. Add one!</p>
        )}

        <h3>Add New Address</h3>
        <form onSubmit={handleAddAddress} className="address-form">
          <div className="form-group">
            <label>Address 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={stateVal}
              onChange={(e) => setStateVal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Address</button>
        </form>
      </section>
    </div>
  );
};

export default UserAccountPage;
