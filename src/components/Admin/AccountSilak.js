import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountSilak.css";
import SilakSummaryTable from "./SilakSummaryTable";

const generateLightColor = () => {
  const letters = '89ABCDEF'; 
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.5)`; 
};

const AccountSilak = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tableTotalName, setTableTotalName] = useState("");
  const [tables, setTables] = useState([]);

  const notes = ["2,000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTableName("");
    setTableTotalName("");
  };

  const handleSaveTable = () => {
    if (tableName.trim() && tableTotalName.trim()) {
      const lightColor = generateLightColor();  
      const table = {
        tableName,
        tableTotalName,
        headerColor: lightColor,     
        rowColor: lightColor,        
        summaryRowColor: lightColor, 
      };
      setTables([...tables, table]);
    }
    handleCloseModal();
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <SilakSummaryTable />
          <button className="action-button" onClick={handleOpenModal}>
            Add New Table
          </button>
          {isModalOpen && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <h3>Add Table</h3>
                <label htmlFor="custom-table-name">Table Name:</label>
                <input
                  type="text"
                  id="custom-table-name"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="Enter table name"
                />
                <label htmlFor="custom-table-total-name">Table Total Name:</label>
                <input
                  type="text"
                  id="custom-table-total-name"
                  value={tableTotalName}
                  onChange={(e) => setTableTotalName(e.target.value)}
                  placeholder="Enter table total name"
                />
                <div className="custom-modal-buttons">
                  <button className="custom-save-button" onClick={handleSaveTable}>
                    Save
                  </button>
                  <button className="custom-cancel-button" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="silak-table-wrapper">
            <table className="notes-table">
              <thead>
                <tr>
                  <th></th>
                </tr>
                <tr>
                  <th>નોટ</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={index}>
                    <td>{note}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {tables.map((table, index) => (
              <table
                key={index}
                className="account-table"
                style={{
                  backgroundColor: table.rowColor,  
                  
                }}
              >
                <thead
                  style={{
                    backgroundColor: table.headerColor,
                    
                  }}
                >
                  <tr>
                    <th colSpan="2">{table.tableName}</th>
                  </tr>
                  <tr>
                    <th>નંગ</th>
                    <th>રકમ</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td><input type="text" defaultValue="0" /></td>
                      <td>0</td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      className="summary-row"
                      style={{
                        backgroundColor: table.summaryRowColor,
                        
                      }}
                    >
                      {table.tableTotalName}
                    </td>
                    <td
                      className="summary-row"
                      style={{
                        backgroundColor: table.summaryRowColor,
                       
                      }}
                    >
                      ₹0
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSilak;
