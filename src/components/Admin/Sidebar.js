import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h1>Departments</h1>
      <ul>
      <li className="menu-item">
      <Link to="/"><span className="icon">🏠</span></Link>
      </li>
        <li className="menu-item" onClick={() => toggleMenu("Account")}>
          <span className="icon" >📊</span>
          {activeMenu === "Account" && (
            <div className="popup-card">
                 <div className="popup-card-title">Account</div>
              <ul>
                <li><Link to="/accounts">SILAK</Link></li>
                <li><Link to="/">Account 2</Link></li>
                <li><Link to="/">Account 3</Link></li>
              </ul>
            </div>
          )}
        </li>
        <li className="menu-item" onClick={() => toggleMenu("Thalbhet")}>
          <span className="icon" >🍽️</span>
          {activeMenu === "Thalbhet" && (
             <div className="popup-card">
             <div className="popup-card-title">Thalbhet</div>
          <ul>
            <li><Link to="/">SILAK</Link></li>
            <li><Link to="/">Account 2</Link></li>
            <li><Link to="/">Account 3</Link></li>
          </ul>
        </div>
          )}
        </li>
        <li className="menu-item" onClick={() => toggleMenu("Shibir")}>
          <span className="icon" >🏕️</span>
          {activeMenu === "Shibir" && (
              <div className="popup-card">
              <div className="popup-card-title">Shibir</div>
           <ul>
             <li><Link to="/">SILAK</Link></li>
             <li><Link to="/">Account 2</Link></li>
             <li><Link to="/">Account 3</Link></li>
           </ul>
         </div>
          )}
        </li>
        <li className="menu-item" onClick={() => toggleMenu("Stall")}>
          <span className="icon">🛍️</span>
          {activeMenu === "Stall" && (
             <div className="popup-card">
             <div className="popup-card-title">Stall</div>
          <ul>
            <li><Link to="/">SILAK</Link></li>
            <li><Link to="/">Account 2</Link></li>
            <li><Link to="/">Account 3</Link></li>
          </ul>
        </div>
          )}
        </li>
        <li className="menu-item" onClick={() => toggleMenu("Alpahar")}>
          <span className="icon">🍟</span>
          {activeMenu === "Alpahar" && (
              <div className="popup-card">
              <div className="popup-card-title">Alpahar</div>
           <ul>
             <li><Link to="/">SILAK</Link></li>
             <li><Link to="/">Account 2</Link></li>
             <li><Link to="/">Account 3</Link></li>
           </ul>
         </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
