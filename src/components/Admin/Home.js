import React, { useState } from "react";
import UserForm from "./AddUserForm";
import UserTable from "./UserTable";

function Home() {
  const [users, setUsers] = useState([
    { id: 1, name: "Hensi Jasoliya", email: "admin10@gmail.com", userType: "super Admin", password: "Admin@123" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", userType: "", password: "" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const { name, email, userType, password } = newUser;

    if (!name || !email || !userType || !password) {
      alert("All fields are required!");
      return;
    }

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert("Email already exists! Please use a different email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", userType: "", password: "" });
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <>
      <UserForm newUser={newUser} handleChange={handleChange} handleAddUser={handleAddUser} />
      <UserTable users={users} onUpdateUser={handleUpdateUser} />
    </>
  );
}

export default Home;
