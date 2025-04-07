import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src="./images/admin-logo.png" alt="Logo" className="logo" />
          <div className="logo-text-container">
            <h1 className="logo-text">Admin Panel</h1>
           
          </div>
        </div>
        
        <div className="icon-logout-container">
            <Link to="/">
              <span className="icon-home">🏠</span>
            </Link>
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
