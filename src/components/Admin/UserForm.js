import React from "react";
import "./UserForm.css";

const UserForm = ({ newUser, handleChange, handleAddUser }) => {
  return (
    <form className="inline-form" onSubmit={handleAddUser}>
      <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Enter Name" required />
      <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter Email" required />
      <select name="userType" value={newUser.userType} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="SUPER ADMIN">Super Admin</option>
        <option value="MANAGER">Manager</option>
        <option value="USER">User</option>
      </select>
      <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter Password" required />
      <button type="submit" className="add-btn"> <i className="fas fa-plus"></i> Add </button>
    </form>
  );
};

export default UserForm;