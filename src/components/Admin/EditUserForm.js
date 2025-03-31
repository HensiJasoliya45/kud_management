import React, { useState } from "react";
import "./EditUserForm.css";

const EditUserForm = ({ user, onSave, onClose }) => {
  const [editUser, setEditUser] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    onSave(editUser);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit User</h2>
        <form className="edit-form">
          <div className="input-group">
            <label className="edit-label-text">Name:</label>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </div>

          <div className="input-group">
            <label  className="edit-label-text">Email:</label>
            <input
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>

          <div className="input-group">
            <label  className="edit-label-text">User Type:</label>
            <select name="userType" value={editUser.userType} onChange={handleInputChange}>
              <option value="Admin"> Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="input-group password-group">
            <label  className="edit-label-text">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={editUser.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
              <span className="edit-eye-icon" onClick={togglePasswordVisibility}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="save-btn" onClick={handleSave}>Save</button>
            <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
