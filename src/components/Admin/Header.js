import React from "react";
import "./Header.css";

const Header = () => {

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src="./images/admin-logo.png" alt="Logo" className="logo" />
          <div className="logo-text-container">
            <h1 className="logo-text">Admin Panel</h1>
            <p className="sub-text">જય સ્વામિનારાયણ - કુંડળધામ</p>
          </div>
        </div>
        <button className="logout-btn"><i className="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </header>
  );
};

export default Header;