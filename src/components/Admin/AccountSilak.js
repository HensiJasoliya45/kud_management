import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SilakTable from "./SilakTable"; 
import "./Admin.css";

const AccountSilak = () => {
  const [data, setData] = useState([
    ["2,000", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["500", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["200", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["100", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["50", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["20", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["10", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["5", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["2", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["", "A", "₹0", "B", "₹0", "C", "₹0", "D", "₹0", "E", "₹0", "F", "₹0"],
  ]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    if (rowIndex === data.length - 1 || colIndex % 2 === 0) return;

    const updatedData = [...data];
    const quantity = parseInt(value) || 0;
    const noteValue = parseInt(updatedData[rowIndex][0].replace(/,/g, "")) || 0;

    updatedData[rowIndex][colIndex] = quantity;
    updatedData[rowIndex][colIndex + 1] = quantity * noteValue;

    const lastRow = updatedData.length - 1;
    let totalSum = 0;

    for (let i = 2; i < updatedData[0].length; i += 2) {
      let sum = 0;
      for (let j = 0; j < lastRow; j++) {
        sum += parseInt(updatedData[j][i]) || 0;
      }
      updatedData[lastRow][i] = sum > 0 ? `₹${sum}` : sum;
      totalSum += sum;
    }

    console.log("Total Sum of Table:", `₹${totalSum}`);
    setData(updatedData);
  };

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="content">
          <SilakTable data={data} handleCellChange={handleCellChange} />
        </div>
      </div>
    </div>
  );
};

export default AccountSilak;
