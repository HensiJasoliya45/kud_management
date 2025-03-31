import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminDashbord from "./components/Admin/AdminDashbord";
import Login from "./components/Login/Login";
import AccountSilak from "./components/Admin/AccountSilak";
import "./App.css" 

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<AdminDashbord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accounts" element={<AccountSilak />} />
          </Routes>
    </Router>
  );
}

export default App;
