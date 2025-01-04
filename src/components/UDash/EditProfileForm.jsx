import React, { useState } from "react";
import './UDash.css';

const EditProfileForm = ({ firstName, lastName, email, phone, password, confirmPassword, setFirstName, setLastName, setEmail, setPhone, setPassword, setConfirmPassword, handleSubmit }) => {
  return (
    <div className="main-container">
      <div className="prof-container">
        <h2 className="prof-heading">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="prof-form">
          <div className="formd-row">
            <div className="formd-group half-width">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
              />
            </div>
            <div className="formd-group half-width">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="formd-row">
            <div className="formd-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
                placeholder="Email"
              />
            </div>
            <div className="formd-group">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="formd-row">
            <div className="formd-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div className="formd-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="dash-button-container">
            <button type="submit" className="dash-update-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;