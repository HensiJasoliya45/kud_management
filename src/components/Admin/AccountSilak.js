import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountSilak.css";
import SilakSummaryTable from "./SilakSummaryTable";
// import "./ColorPickerGrid.css";
import CustomDatePicker from "./CustomDatePicker"; 

const AccountSilak = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState([]);
  const [cardVisible, setCardVisible] = useState({ tableIndex: null, rowIndex: null });
  const [nangs, setNangs] = useState([]);
  const [baseColor, setBaseColor] = useState("#3498db");
  const [selectedColors, setSelectedColors] = useState([]);
  const [accessPeriod, setAccessPeriod] = useState("regular");
  const [customStartDate, setCustomStartDate] = useState(null); 
  const [customEndDate, setCustomEndDate] = useState(null);   

  const notes = ["2,000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTableName("");
    setAccessPeriod("regular");
    setCustomStartDate(null); 
    setCustomEndDate(null);  
  };

  const lightenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const darkenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;

    return (
      "#" +
      (
        0x1000000 +
        (R > 0 ? R : 0) * 0x10000 +
        (G > 0 ? G : 0) * 0x100 +
        (B > 0 ? B : 0)
      )
        .toString(16)
        .slice(1)
    );
  };

  const ensureLightColor = (hex) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness < 180) {
      return lightenColor(hex, 40);
    }
    return hex;
  };

  const handleSaveTable = () => {
    if (tableName.trim()) {
      const adjustedBaseColor = ensureLightColor(baseColor);
      const darkenedHeadingColor = darkenColor(adjustedBaseColor, 20);
      const isColorAlreadyUsed = tables.some(
        (table) => table.headingColor.toLowerCase() === darkenedHeadingColor.toLowerCase()
      );

      if (isColorAlreadyUsed) {
        alert("This color is already used. Please choose a different color.");
        return;
      }

      const table = {
        tableName,
        tableTotalName: tableName,
        headingColor: darkenedHeadingColor, 
        rowColor: lightenColor(adjustedBaseColor, 30),
        borderColor: darkenColor(adjustedBaseColor, 50),
      };
      setTables([...tables, table]);
      setNangs([...nangs, Array(notes.length).fill(0)]);
      setSelectedColors([...selectedColors, adjustedBaseColor]);

      handleCloseModal();
    }
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
                <label htmlFor="custom-table-name">Title</label>
                <input
                  type="text"
                  id="custom-table-name"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="Enter table name"
                />

                {/* Color Picker - Disabled for now */}
                {/* <ColorPickerGrid
                  label="Background Color"
                  selectedColor={bgColor}
                  onChange={setBgColor}
                />
                <ColorPickerGrid
                  label="Border Color"
                  selectedColor={borderColor}
                  onChange={setBorderColor}
                />
                <ColorPickerGrid
                  label="Heading/Footer Color"
                  selectedColor={headingColor}
                  onChange={setHeadingColor}
                /> */}

                <div className="color-picker-group">
                  <label>Table Base Color:</label>
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
                        <span className="color-label">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="access-period-group">
                  <label>Access Period</label>
                  <select
                    value={accessPeriod}
                    onChange={(e) => setAccessPeriod(e.target.value)}
                  >
                    <option value="regular">Regular</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="custom">Custom</option>
                  </select>
                </div> */}
                  
                <div className="access-period-group">
                  <label>Access Period</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        value="regular"
                        checked={accessPeriod === "regular"}
                        onChange={() => setAccessPeriod("regular")}
                      />
                      Regular
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="month"
                        checked={accessPeriod === "month"}
                        onChange={() => setAccessPeriod("month")}
                      />
                      Month
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="week"
                        checked={accessPeriod === "week"}
                        onChange={() => setAccessPeriod("week")}
                      />
                      Week
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        value="custom"
                        checked={accessPeriod === "custom"}
                        onChange={() => setAccessPeriod("custom")}
                      />
                      Custom
                    </label>
                  </div>
                </div>

                {/* {accessPeriod === "custom" && (
                  <div className="custom-date-picker-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                    <label>End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                  </div>
                )} */}

                {accessPeriod === "custom" && (
                  <CustomDatePicker startDate={customStartDate} endDate={customEndDate} 
                  setStartDate={setCustomStartDate}
                  setEndDate={setCustomEndDate}
                  />
                )} 

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
                  <tr key={index}>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td>Total</td></tr>
              </tfoot>
            </table>

            {tables.map((table, tableIndex) => (
              <table
                key={tableIndex}
                className="account-table"
                style={{
                  border: `2px solid ${table.borderColor}`,
                  borderCollapse: "collapse",
                  backgroundColor: table.rowColor,
                }}
              >
                <thead style={{ backgroundColor: table.headingColor }}>
                  <tr>
                    <th
                      colSpan="2"
                      style={{ border: `1px solid ${table.borderColor}` }}
                    >
                      {table.tableName}
                    </th>
                  </tr>
                  <tr>
                    <th style={{ border: `1px solid ${table.borderColor}` }}>રકમ</th>
                    <th style={{ border: `1px solid ${table.borderColor}` }}>નંગ</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td style={{ border: `1px solid ${table.borderColor}` }}>0</td>
                      <td
                        className="icon-container"
                        style={{ border: `1px solid ${table.borderColor}` }}
                      >
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
                <tfoot style={{ backgroundColor: table.headingColor }}>
                  <tr>
                    <td
                      className="summary-row"
                      colSpan="2"
                      style={{ border: `1px solid ${table.borderColor}` }}
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
