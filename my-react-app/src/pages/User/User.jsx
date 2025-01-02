import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./User.css";

const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = useSelector((state) => state.auth.token);

  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: username,
          firstName,
          lastName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred");
      }

      const data = await response.json();
      console.log("Profil mis à jour avec succès :", data);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error.message);
      setErrorMessage(error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-page">
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/user">
            <i className="fa fa-user-circle"></i>
            {username || "User"}
          </a>
          <a className="main-nav-item" href="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>

      <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            <>
              <h1>
                Welcome back
                <br />
                {username || "User"} !
              </h1>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            </>
          ) : (
            <div className="edit-form">
              <h1>Edit User Info</h1>
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
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default User;
