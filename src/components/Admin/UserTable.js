import React, { useState } from "react";
import "./UserTable.css";
import EditUserForm from "./EditUserForm"; 

const UserTable = ({ users, onUpdateUser }) => {
  const [showPasswords, setShowPasswords] = useState({});
  const [editUser, setEditUser] = useState(null);

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openEditModal = (user) => {
    setEditUser(user);
  };

  const closeEditModal = () => {
    setEditUser(null);
  };

  return (
    <>
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
              <td>{user.userType}</td>
              <td>
                {showPasswords[user.id] ? user.password : "••••••"}
                <span className="eye-icon" onClick={() => togglePasswordVisibility(user.id)}>
                  <i className={showPasswords[user.id] ? "fas fa-eye"  :"fas fa-eye-slash"}></i>
                </span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <EditUserForm user={editUser} onSave={onUpdateUser} onClose={closeEditModal} />
      )}
    </>
  );
};

export default UserTable;
