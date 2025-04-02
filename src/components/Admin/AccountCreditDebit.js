import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Admin.css";
import "./AccountCreditDebit.css";

const AccountCreditDebit = () => {
  const [tables, setTables] = useState([
    { name: "TB", creditData: [], debitData: [], openingAmount: 0 },
    { name: "AB", creditData: [], debitData: [], openingAmount: 0 },
    { name: "SB", creditData: [], debitData: [], openingAmount: 0 },
  ]);

  const [newSection, setNewSection] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [activeTable, setActiveTable] = useState("TB");

  const [newTableName, setNewTableName] = useState("");
  const [isAddingTable, setIsAddingTable] = useState(false);

  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  const handleAddTable = () => {
    setIsAddingTable(true); 
  };

  const handleSaveNewTable = () => {
    if (newTableName.trim()) {
      const tableExists = tables.some((table) => table.name.toLowerCase() === newTableName.trim().toLowerCase());
  
      if (tableExists) {
        alert("A table with this name already exists. Please choose a different name.");
        return; 
      }
  
      const newTable = {
        name: newTableName.trim(),
        creditData: [],
        debitData: [],
        openingAmount: 0,
      };
      setTables([...tables, newTable]);
      setNewTableName(""); 
      setIsAddingTable(false); 
    } else {
      alert("Please enter a valid table name.");
    }
  };
  

  const handleCancelAddTable = () => {
    setNewTableName(""); 
    setIsAddingTable(false); 
  };

  const handleAddData = () => {
    if (newSection && newAmount) {
      const amount = parseFloat(newAmount);
      const updatedTables = tables.map((table) => {
        if (table.name === activeTable) {
          if (transactionType === "credit") {
            table.creditData.push({ section: newSection, amount });
          } else if (transactionType === "debit") {
            table.debitData.push({ section: newSection, amount });
          }
        }
        return table;
      });
      setTables(updatedTables);
      setNewSection("");
      setNewAmount("");
    }
  };

  const handleEditData = (index, field, value, tableName, type) => {
    const updatedTables = tables.map((table) => {
      if (table.name === tableName) {
        if (type === "credit") {
          table.creditData[index] = { ...table.creditData[index], [field]: value };
        } else if (type === "debit") {
          table.debitData[index] = { ...table.debitData[index], [field]: value };
        }
      }
      return table;
    });
    setTables(updatedTables);
  };

  const totalCredit = (data) => data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const totalDebit = (data) => data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const calculateClosingBalance = () => {
    const table = tables.find((table) => table.name === activeTable);
    const totalCred = totalCredit(table.creditData);
    const totalDeb = totalDebit(table.debitData);
    return totalCred + parseFloat(table.openingAmount || 0) - totalDeb;
  };

  const handleOpeningAmountChange = (value) => {
    const updatedTables = tables.map((table) => {
      if (table.name === activeTable) {
        table.openingAmount = parseFloat(value) || 0;
      }
      return table;
    });
    setTables(updatedTables);
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <div className="Account-credit-debit-container">
            <div className="subheader">
              {tables.map((table) => (
                <span
                  key={table.name}
                  className={activeTable === table.name ? "active" : ""}
                  onClick={() => setActiveTable(table.name)}
                >
                  {table.name}
                </span>
              ))}
              <span className="add-table" onClick={handleAddTable}>
                + Add Table
              </span>
            </div>

            {/* Modal for adding a new table */}
            {isAddingTable && (
              <div className="modal-overlay show">
                <div className="add-table-modal">
               
                  <h3>Add New Table</h3>
                  <input
                    type="text"
                    placeholder="Enter Table Name"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                  />
                  <button onClick={handleSaveNewTable} className="modal-button">Save</button>
                  <button onClick={handleCancelAddTable} className="cancel-button">Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className="inline-credit-debit-container">
            <div className="inline-credit-debit-form">
              <h3>Add {transactionType === "credit" ? "Credit" : "Debit"} Data</h3>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <input
                type="text"
                placeholder="Section"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
              <button onClick={handleAddData}>
                Add {transactionType === "credit" ? "Credit" : "Debit"}
              </button>
            </div>
          </div>

          <div className="credit-debit-table-section">
            <div className="credit-debit-table-container">
              {tables
                .filter((table) => table.name === activeTable)
                .map((table) => (
                  <table className="account-credit-debit-table" key={table.name}>
                    <thead>
                      <tr>
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
                    <tbody>
                      <tr className="credit-debit-opening-row">
                        <td className="opening-cell">Opening</td>
                        <td className="opening-cell">
                          <input
                            type="number"
                            value={table.openingAmount}
                            onChange={(e) => handleOpeningAmountChange(e.target.value)}
                          />
                        </td>
                      </tr>

                      {table.creditData.map((credit, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              value={credit.section}
                              onChange={(e) =>
                                handleEditData(index, "section", e.target.value, table.name, "credit")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={credit.amount}
                              onChange={(e) =>
                                handleEditData(index, "amount", e.target.value, table.name, "credit")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={table.debitData[index]?.section || ""}
                              onChange={(e) =>
                                handleEditData(index, "section", e.target.value, table.name, "debit")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={table.debitData[index]?.amount || ""}
                              onChange={(e) =>
                                handleEditData(index, "amount", e.target.value, table.name, "debit")
                              }
                            />
                          </td>
                        </tr>
                      ))}

                      <tr className="credit-debit-total-row">
                        <td>Total</td>
                        <td>₹{formatNumber(totalCredit(table.creditData) + parseFloat(table.openingAmount))}</td>
                        <td>Total</td>
                        <td>₹{formatNumber(totalDebit(table.debitData))}</td>
                      </tr>
                      <tr className="credit-debit-today-row">
                        <td>TO DAY</td>
                        <td>₹{formatNumber(totalCredit(table.creditData))}</td>
                        <td>TO DAY</td>
                        <td>₹{formatNumber(totalDebit(table.debitData))}</td>
                      </tr>
                      <tr className="credit-debit-closing-row">
                        <td colSpan="2"></td>
                        <td className="closing-cell">Closing</td>
                        <td className="closing-cell">
                        ₹{formatNumber(calculateClosingBalance())}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreditDebit;
