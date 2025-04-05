import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountSilak.css";
import SilakSummaryTable from "./SilakSummaryTable";

const generateLightColor = () => {
  const letters = "89ABCDEF";
  let color = "#";
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
  const [tables, setTables] = useState([]);
  const [cardVisible, setCardVisible] = useState({ tableIndex: null, rowIndex: null });
  const [nangs, setNangs] = useState([]); 

  const notes = ["2,000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTableName("");
  };

  const handleSaveTable = () => {
    if (tableName.trim()) {
      const lightColor = generateLightColor();
      const table = {
        tableName,
        tableTotalName: tableName,
        headerColor: lightColor,
        rowColor: lightColor,
        summaryRowColor: lightColor,
      };
      setTables([...tables, table]);


      setNangs([...nangs, Array(notes.length).fill(0)]);
    }
    handleCloseModal();
  };

  const handleNungChange = (tableIndex, rowIndex, value) => {
    const updatedNangs = [...nangs];
    updatedNangs[tableIndex][rowIndex] = value;
    setNangs(updatedNangs);
  };

  const handleIconClick = (tableIndex, rowIndex) => {
    if (
      cardVisible.tableIndex === tableIndex &&
      cardVisible.rowIndex === rowIndex
    ) {
      setCardVisible({ tableIndex: null, rowIndex: null });
    } else {
      setCardVisible({ tableIndex, rowIndex });
    }
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <SilakSummaryTable />

          <button className="action-button" onClick={handleOpenModal}>
            Add Table
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
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                </tr>
              </tfoot>
            </table>

            {tables.map((table, tableIndex) => (
              <table
                key={tableIndex}
                className="account-table"
                style={{ backgroundColor: table.rowColor }}
              >
                <thead style={{ backgroundColor: table.headerColor }}>
                  <tr>
                    <th colSpan="2">{table.tableName}</th>
                  </tr>
                  <tr>
                    <th>રકમ</th>
                    <th>નંગ</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>0</td>
                      <td className="icon-container">
                        <input
                          type="number"
                          className="nung-input"
                          value={nangs?.[tableIndex]?.[rowIndex] || ""}
                          onChange={(e) =>
                            handleNungChange(tableIndex, rowIndex, e.target.value)
                          }
                        />
                        <i
                          className="fas fa-chevron-right icon-right"
                          onClick={() => handleIconClick(tableIndex, rowIndex)}
                        ></i>

                        {cardVisible.tableIndex === tableIndex &&
                          cardVisible.rowIndex === rowIndex && (
                            <div className="small-card">
                              <div className="samll-card-nung-input">
                                <button>-</button>
                                <input type="number" />
                              </div>
                              <div className="small-card-history">
                                <span className="history-title">H</span> - 5 + 6 - 5
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="summary-row"
                      style={{ backgroundColor: table.summaryRowColor }}
                    ></td>
                    <td
                      className="summary-row"
                      style={{ backgroundColor: table.summaryRowColor }}
                    ></td>
                  </tr>
                </tfoot>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSilak;
