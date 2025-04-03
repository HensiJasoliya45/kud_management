import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountCreditDebit.css";

const getRandomLightColor = () => {
  const letters = "CDEF"; 
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const hexToRgba = (hex, opacity) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};


const AccountCreditDebit = () => {
  const [tables, setTables] = useState([{ name: "AB", color: getRandomLightColor() }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vibhag: "",
    rakam: "",
    type: "Debit",
    table: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTableName("");
  };

  const addTable = () => {
    if (tableName.trim() !== "") {
      setTables([...tables, { name: tableName, color: getRandomLightColor() }]);
      closeModal();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setShowForm(false);
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content account-credit-debit-section">
          <div className="button-container">
            <button className="new-table-btn" onClick={openModal}>Add New Table</button>
            <button className="new-table-btn" onClick={() => setShowForm(true)}>Add Data</button>
          </div>

          {showForm && (
            <div className="form-modal-overlay">
              <div className="form-modal-content">
                <h3>Add Data</h3>
                <form name="creditDebitDataAddForm" onSubmit={handleSubmit}>
                  <label>
                    <b>વિભાગ</b>
                    <input type="text" name="vibhag" value={formData.vibhag} onChange={handleChange} required />
                  </label>
                  <label>
                    <b>રકમ</b>
                    <input type="number" name="rakam" value={formData.rakam} onChange={handleChange} required />
                  </label>
                  <label>
                    <b>Type</b>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      <option value="Debit">Debit</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </label>
                  <label>
                    <b>Select Table</b>
                    <select name="table" value={formData.table} onChange={handleChange} required>
                      <option value="">Select Table</option>
                      {tables.map((table, index) => (
                        <option key={index} value={table.name}>{table.name}</option>
                      ))}
                    </select>
                  </label>
                  <div className="form-modal-buttons">
                    <button type="submit" className="save-btn">Submit</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="table-container">
            {tables.map((table, index) => (
              <div key={index} className="table-wrapper">
                <table className="credit-debit-table">
                  <thead style={{ backgroundColor: hexToRgba(table.color, 1) }}>
                    <tr className="table-title-row">
                      <th colSpan="4">{table.name}</th>
                    </tr>
                    <tr>
                      <th colSpan="2">CREDIT</th>
                      <th colSpan="2">DEBIT</th>
                    </tr>
                    <tr>
                      <th>વિભાગ</th>
                      <th>રકમ</th>
                      <th>વિભાગ</th>
                      <th>રકમ</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: hexToRgba(table.color, 0.5) }}>
                    <tr>
                      <td className="closing-summary-row">Opening</td>
                      <td className="closing-summary-row">2</td>
                      <td ></td>
                      <td ></td>
                    </tr>
                    <tr>
                      <td ></td>
                      <td >15,000</td>
                      <td></td>
                      <td >8,000</td>
                    </tr>
                  </tbody>
                  <tfoot style={{ backgroundColor: hexToRgba(table.color, 1) }}>
                    <tr className="total-summary-row">
                      <td>Total</td>
                      <td>15,002</td>
                      <td>Total</td>
                      <td>8,000</td>
                    </tr>
                    <tr className="today-summary-row">
                      <td>To Day</td>
                      <td>15,000</td>
                      <td>To Day</td>
                      <td>8,000</td>
                    </tr>
                    <tr className="closing-summary-row">
                      <td colSpan={2}></td>
                      <td>Closing</td>
                      <td>7,002</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Table Name</h3>
            <input type="text" placeholder="Table Name" value={tableName} onChange={(e) => setTableName(e.target.value)} />
            <div className="modal-buttons">
              <button onClick={addTable} className="save-btn">Save</button>
              <button onClick={closeModal} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCreditDebit;
