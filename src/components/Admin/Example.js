import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SummaryPopup from "./SummaryPopup"; // Import the SummaryPopup component
import "./Admin.css";
import "./ex.css";

const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tableTotalName, setTableTotalName] = useState("");
  const [tables, setTables] = useState([]);
  const [isSummaryPopupOpen, setIsSummaryPopupOpen] = useState(false);

  const notes = ["2,000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTableName("");
    setTableTotalName("");
  };

  const handleSaveTable = () => {
    if (tableName.trim() && tableTotalName.trim()) {
      setTables([...tables, { tableName, tableTotalName }]);
    }
    handleCloseModal();
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
        <div className="button-container">
  <button className="summary-button" onClick={() => setIsSummaryPopupOpen(true)}>
    Open Summary Table
  </button>
  <button className="action-button" onClick={handleOpenModal}>
    Add New Table
  </button>
</div>


          {/* Summary Popup */}
          <SummaryPopup isOpen={isSummaryPopupOpen} onClose={() => setIsSummaryPopupOpen(false)} />

          {/* Add Table Modal */}
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
                <tr><th></th></tr>
                <tr><th>નોટ</th></tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={index}><td>{note}</td></tr>
                ))}
                <tr><td></td></tr>
              </tbody>
            </table>

            {tables.map((table, index) => (
  <table key={index} className={`account-table ${index % 2 === 0 ? "even-table" : "odd-table"}`}>
    <thead>
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
        <td className="summary-row ">{table.tableTotalName}</td>
        <td className="summary-row">₹0</td>
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

export default Example;
