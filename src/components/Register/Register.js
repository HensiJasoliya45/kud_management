import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("User Registered:", inputs);
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-image">
          <img src="./images/admin-logo.png" alt="Registration Illustration" />
        </div>
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={inputs.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Role</label>
              <select name="role" value={inputs.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="register-btn">Register</button>

            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
