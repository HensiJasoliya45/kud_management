import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminDashbord from "./components/Admin/AdminDashbord";
import Login from "./components/Login/Login";
import "./App.css"

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<AdminDashbord />} />
            <Route path="/login" element={<Login />} />
          </Routes>
    </Router>
  );
}

export default App;
