import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminDashbord from "./components/Admin/AdminDashboard";
import Login from "./components/Login/Login";
import AccountSilak from "./components/Admin/AccountSilak";
import AccountCreditDebit from "./components/Admin/AccountCreditDebit";
import AccountCover from "./components/Admin/AccountCover";
import "./App.css" 


function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<AdminDashbord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accounts" element={<AccountSilak />} />
            <Route path="/account-credit-debit" element={<AccountCreditDebit />} />
            <Route path="/account-cover" element={<AccountCover/>} />
           
          </Routes>
    </Router>
  );
}

export default App;
