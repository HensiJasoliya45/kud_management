import React, { useState } from "react";
import "./UserTable.css";

const UserTable = ({ users }) => {
  const [showPasswords, setShowPasswords] = useState({});

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>User Type</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><strong>{user.userType}</strong></td>
            <td>
              {showPasswords[user.id] ? user.password : "••••••"}
              <span className="eye-icon" onClick={() => togglePasswordVisibility(user.id)}>
                <i className={showPasswords[user.id] ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </td>
            <td><button className="edit-btn"> Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;