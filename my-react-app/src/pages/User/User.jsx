import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import AccountItem from "./AccountItem"; 
import "./User.css";

const User = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.userName || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      const data = await response.json();
      dispatch(setUser({ userName: data.body.userName }));
      setSuccessMessage("Username updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsername(user?.userName || "");
  };

  return (
    <div className="user-page">
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.webp"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/user">
            <i className="fa fa-user-circle"></i>
            {user?.userName || "User"}
          </a>
          <a className="main-nav-item" href="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.userName || "User"}!
          </h1>
          {!isEditing ? (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Username
            </button>
          ) : (
            <div className="edit-form">
              <div className="input-wrapper">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label>First Name:</label>
                <input type="text" value={user?.firstName || ""} disabled />
              </div>
              <div className="input-wrapper">
                <label>Last Name:</label>
                <input type="text" value={user?.lastName || ""} disabled />
              </div>
              <div className="button-group">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
            </div>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        
        <AccountItem
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountItem
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountItem
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default User;
