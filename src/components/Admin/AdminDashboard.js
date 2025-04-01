import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import "./Admin.css";

const AdminDashboard = () => {

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
        <Home/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;