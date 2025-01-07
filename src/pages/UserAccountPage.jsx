// src/pages/UserAccountPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
// ^ create an async thunk in userSlice for updating user info if needed
import { useNavigate } from "react-router-dom";

const UserAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  // Local form states for editing user profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  // If user is not logged in, we might redirect them to login
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      // Populate form fields with existing user info
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setUsername(userInfo.username || "");
      setEmail(userInfo.email || "");
      setGender(userInfo.gender || "");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch an updateUser thunk (assuming you have it in your userSlice)
    dispatch(
      updateUser({
        id: userInfo.id,
        firstName,
        lastName,
        username,
        email,
        gender,
      })
    );
  };

  if (!userInfo) {
    return null; // or a loading spinner while we check auth
  }

  return (
    <div className="user-account-page">
      <h2>My Account</h2>

      {error && <div className="update-error">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="user-account-form">
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
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
    </div>
  );
};

export default UserAccountPage;
