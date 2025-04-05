import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountCreditDebit.css";

const getRandomLightColor = () => {
  const letters = "89ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const AccountCreditDebit = () => {
  const [tables, setTables] = useState([
    {
      name: "AB",
      color: getRandomLightColor(),
      rows: [
        ["Opening", 2, "", ""],
        ["", 15000, "", 8000],
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [rowAddOpenState, setRowAddOpenState] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTableName("");
  };

  const addTable = () => {
    if (tableName.trim() !== "") {
      setTables([
        ...tables,
        {
          name: tableName,
          color: getRandomLightColor(),
          rows: [
            ["Opening", 0, "", ""],
            ["", 0, "", 0],
          ],
        },
      ]);
      closeModal();
    }
  };

  const handleCellChange = (tableIndex, rowIndex, columnIndex, value) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex][columnIndex] = value;
    setTables(updatedTables);
  };

  const calculateTotal = (table, columnIndex) => {
    return table.rows.reduce(
      (acc, row) => acc + (parseFloat(row[columnIndex]) || 0),
      0
    );
  };

  const addNewRow = (tableIndex) => {
    const newRow = ["", 0, "", 0];
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push(newRow);
    setTables(updatedTables);
    toggleRowAddState(tableIndex);
  };

  const toggleRowAddState = (tableIndex) => {
    setRowAddOpenState((prevState) => ({
      ...prevState,
      [tableIndex]: !prevState[tableIndex],
    }));
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content account-credit-debit-section">
          <button className="new-table-btn" onClick={openModal}>
            Add Table
          </button>

          <div className="table-container">
            {tables.map((table, tableIndex) => (
              <div key={tableIndex} className="table-wrapper">
                <table className="credit-debit-table">
                  <thead style={{ backgroundColor: hexToRgba(table.color, 0.8) }}>
                    <tr>
                      <th colSpan="4">{table.name}(80)</th>
                    </tr>
                    <tr>
                      <th>જમા નોંધ</th>
                      <th>રકમ</th>
                      <th>ઉધાર નોંધ</th>
                      <th>રકમ</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: hexToRgba(table.color, 0.5) }}>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td
                            key={colIndex}
                            className={colIndex === 0 ? "opening-row" : ""}
                          >
                            <div className="cell-wrapper">
                              {rowIndex === 0 && colIndex === 0 ? (
                                <span>Opening</span>
                              ) : (
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) =>
                                    handleCellChange(
                                      tableIndex,
                                      rowIndex,
                                      colIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              )}

                              {rowIndex === table.rows.length - 1 &&
                                colIndex === row.length - 1 && (
                                  <span
                                    className="table-add-open"
                                    onClick={() => toggleRowAddState(tableIndex)}
                                  >
                                    <i className="fas fa-chevron-right row-icon-right"></i>
                                  </span>
                                )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot style={{ backgroundColor: hexToRgba(table.color, 0.8) }}>
                    <tr>
                      <th>Total</th>
                      <th>{calculateTotal(table, 1)}</th>
                      <th>Total</th>
                      <th>{calculateTotal(table, 3)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          {Object.keys(rowAddOpenState).map((tableIndex) => {
            if (rowAddOpenState[tableIndex]) {
              return (
                <button
                  key={tableIndex}
                  onClick={() => addNewRow(parseInt(tableIndex))}
                  className="add-row-btn"
                >
                  <span className="plus-icon">+</span>
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Table Name</h3>
            <input
              type="text"
              placeholder="Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={addTable} className="save-btn">
                Save
              </button>
              <button onClick={closeModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCreditDebit;
