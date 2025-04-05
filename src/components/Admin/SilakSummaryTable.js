import React from "react";
import "./SilakSummaryTable.css";

const SilakSummaryTable = () => {
  return (
    <div className="summary-table-container">
      <div className="tables-row">
        <table className="summary-table small-table-1">
          <tbody>
            <tr><th>તફાવત</th><td>#VALUE!</td></tr>
            <tr><th>ભૂલ ની રકમ</th><td>800</td></tr>
            <tr><th>કુલ તફાવત</th><td>#VALUE!</td></tr>
            <tr><th>ભૂલ / તફાવતનું કારણ</th><td>SMK</td></tr>
          </tbody>
        </table>

        <table className="summary-table small-table-2">
          <tbody>
            <tr><th>કુલ સિલક</th><th>0</th></tr>
            <tr><td>TB</td><td>2(D24)</td></tr>
            <tr><td>AB</td><td>2(D24)</td></tr>
            <tr><td>SB</td><td>2(D24)</td></tr>
          </tbody>
        </table>

        <table className="summary-table normal-table">
          <tbody>
            <tr>
              <th>કુલ સિલક</th>
              <th>0</th>
              </tr>
            <tr>
              <td>ગલ્લો</td>
              <td>C28</td>
              </tr>
            <tr><td>તિજોરી</td><td>E28</td></tr>
            <tr><td>છૂટક પરચુરણ</td><td>G28</td></tr>
            <tr><td>અન્ય સિલક</td><td>128</td></tr>
            <tr><td>ઉપલક રકમ</td><td>K28</td></tr>
            <tr><td>પ્રોજેક્ટ રકમ</td><td>M28</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SilakSummaryTable;
