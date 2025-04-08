import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountCreditDebit.css";
import CustomDatePicker from "./CustomDatePicker"; 
import {lightenColor,darkenColor,ensureLightColor} from "./ColorUtil";

// Commenting out the color picker logic
// const getRandomLightColor = () => {
//   const letters = "89ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * letters.length)];
//   }
//   return color;
// };

// Commenting out the hexToRgba function
// const hexToRgba = (hex, opacity) => {
//   const r = parseInt(hex.substring(1, 3), 16);
//   const g = parseInt(hex.substring(3, 5), 16);
//   const b = parseInt(hex.substring(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

const AccountCreditDebit = () => {

   const [baseColor, setBaseColor] = useState("#3498db");
   const [selectedColors, setSelectedColors] = useState([]);
   const [tables, setTables] = useState([]);

   const [accessPeriod, setAccessPeriod] = useState("regular");
   const [customStartDate, setCustomStartDate] = useState(null); 
   const [customEndDate, setCustomEndDate] = useState(null);  
   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [rowAddOpenState, setRowAddOpenState] = useState({});

  const handleCheckboxChange = (value) => {
    setAccessPeriod(value);

    if (value === "custom") {
      setIsDatePickerOpen(true);  
    } else {
      setIsDatePickerOpen(false);  
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTableName("");
    setAccessPeriod("regular");
    setCustomStartDate(null); 
    setCustomEndDate(null);  
  };

  const addTable = () => {
    if (tableName.trim() !== "") {
      const adjustedBaseColor = ensureLightColor(baseColor);
      const darkenedHeadingColor = darkenColor(adjustedBaseColor, 20);
  
      const isColorAlreadyUsed = tables.some((table) => {
        return table.headingColor && table.headingColor.toLowerCase() === darkenedHeadingColor.toLowerCase();
      });
  
      if (isColorAlreadyUsed) {
        alert("This color is already used. Please choose a different color.");
        return;
      }
  
      const defaultRows = [];
      for (let i = 0; i < 30; i++) {
        if (i === 0) {
          defaultRows.push(["Opening", 0, "", "0"]);
        } else {
          defaultRows.push(["", 0, "", 0]);
        }
      }
  
      setTables([
        ...tables,
        {
          name: tableName,
          color: "#D3D3D3", 
          rows: defaultRows,
          headingColor: darkenedHeadingColor,
          rowColor: lightenColor(adjustedBaseColor, 30),
          borderColor: darkenColor(adjustedBaseColor, 50),
        },
      ]);
      setSelectedColors([...selectedColors, adjustedBaseColor]);
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
                <table className="credit-debit-table"
                style={{
                  border: `2px solid ${table.borderColor}`,
                  borderCollapse: "collapse",
                  backgroundColor: table.rowColor,
                }}
                >
                  <thead style={{ backgroundColor: table.headingColor }}>
                    <tr>
                      <th colSpan="4"  style={{ border: `1px solid ${table.borderColor}` }}
                      >{table.name}(80)</th>
                    </tr>
                    <tr >
                      <th  style={{ border: `1px solid ${table.borderColor}`}}>જમા નોંધ</th>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>રકમ</th>
                      <th   style={{ border: `1px solid ${table.borderColor}` }}>ઉધાર નોંધ</th>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>રકમ</th>
                    </tr>
                  </thead>
                  <tbody >
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td
                            key={colIndex}
                            className={colIndex === 0 ? "opening-row" : ""}
                            style={{ border: `1px solid ${table.borderColor}` }}
                          >
                            <div className="cell-wrapper">
                              {rowIndex === 0 && colIndex === 0 ? (
                                <span>Opening</span>
                              ) : (
                                <input
                                  type="text"
                                  value={cell}
                                  style={{
                                    backgroundColor: table.rowColor,
                                  }}
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
                                    {rowAddOpenState[tableIndex] && (
                                      <button
                                        onClick={() => addNewRow(tableIndex)}
                                        className="add-row-btn"
                                      >
                                        <span className="plus-icon">+</span>
                                      </button>
                                    )}
                                  </span>
                                )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot style={{ backgroundColor: table.headingColor }}>
                    <tr>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>Total</th>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>{calculateTotal(table, 1)}</th>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>Total</th>
                      <th  style={{ border: `1px solid ${table.borderColor}` }}>{calculateTotal(table, 3)}</th>
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
            <h3>Add Table</h3>
            <label htmlFor="table-title">Title</label>
            <input
              type="text"
              placeholder="Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            <div className="color-picker-group">
                  <label>Table Base Color</label>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                  />
                </div>

                <div className="selected-colors-list">
                  <label>Selected Colors</label>
                  <div className="color-square-container">
                    {selectedColors.map((color, index) => (
                      <div
                        key={index}
                        className="color-square"
                        style={{ backgroundColor: color }}
                      >
                      </div>
                    ))}
                  </div>
                  <div className="access-period-group">
                  <label>Access Period</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        value="regular"
                        checked={accessPeriod === "regular"}
                        onChange={() => handleCheckboxChange("regular")}
                      />
                      Regular
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="month"
                        checked={accessPeriod === "month"}
                        onChange={() => handleCheckboxChange("month")}
                      />
                      Month
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="week"
                        checked={accessPeriod === "week"}
                        onChange={() => handleCheckboxChange("week")}
                      />
                      Week
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="custom"
                        checked={accessPeriod === "custom"}
                        onChange={() => handleCheckboxChange("custom")}
                      />
                      Custom
                    </label>
                    <div className={`date-picker-popup ${isDatePickerOpen ? "active" : ""}`}>
                    <button className="close-popup-btn" onClick={() => setIsDatePickerOpen(false)}>Select Date Range<i className="fas fa-times"></i> </button>
                    <CustomDatePicker
                      startDate={customStartDate}
                      endDate={customEndDate}
                      setStartDate={setCustomStartDate}
                      setEndDate={setCustomEndDate}
                     />
                    </div>
                  </div>
                </div>

                {/* {accessPeriod === "custom" && (
                  <CustomDatePicker startDate={customStartDate} endDate={customEndDate} 
                  setStartDate={setCustomStartDate}
                  setEndDate={setCustomEndDate}
                  />
                )}  */}

                </div>
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
