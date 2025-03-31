import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

function Home() {
    const [users, setUsers] = useState([
        { id: 1, name: "Super Admin", email: "admin10@gmail.com", userType: "SUPER ADMIN", password: "Admin@123" },
      ]);
    
      const [newUser, setNewUser] = useState({ name: "", email: "", userType: "", password: "" });
    
      const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
      };
    
      const handleAddUser = (e) => {
        e.preventDefault();
    
        if (!newUser.name || !newUser.email || !newUser.userType || !newUser.password) {
          alert("All fields are required!");
          return;
        }
    
        setUsers([...users, { id: users.length + 1, ...newUser }]);
        setNewUser({ name: "", email: "", userType: "", password: "" });
      };
  return (
    <>
       <UserForm newUser={newUser} handleChange={handleChange} handleAddUser={handleAddUser} />
       <UserTable users={users} />
    </>
  )
}

export default Home
