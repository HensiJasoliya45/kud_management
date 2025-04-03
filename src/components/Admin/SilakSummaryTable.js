import React from "react";
import "./SilakSummaryTable.css";

const SilakSummaryTable = () => {
  return (
    <div className="summary-table-container">
      <div className="tables-row">
        <table className="summary-table small-table-1">
          <thead>
            <tr>
              <th>તફાવત</th>
              <th>ભૂલ ની રકમ</th>
              <th>કુલ તફાવત</th>
              <th>ભૂલ / તફાવતનું કારણ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#VALUE!</td>
              <td>800</td>
              <td>#VALUE!</td>
              <td>SMK</td>
            </tr>
          </tbody>
        </table>

        <table className="summary-table small-table-2">
          <thead>
            <tr>
              <th>કુલ સિલક</th>
              <th>TB</th>
              <th>AB</th>
              <th>SB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>0</th>
              <td>2(D24)</td>
              <td>2(D24)</td>
              <td>2(D24)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="summary-table normal-table">
        <thead>
          <tr>
            <th>કુલ સિલક</th>
            <td>ગલ્લો</td>
            <td>તિજોરી</td>
            <td>છૂટક પરચુરણ</td>
            <td>અન્ય સિલક</td>
            <td>ઉપલક રકમ</td>
            <td>પ્રોજેક્ટ રકમ</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>0</th>
            <td>C28</td>
            <td>E28</td>
            <td>G28</td>
            <td>128</td>
            <td>K28</td>
            <td>M28</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SilakSummaryTable;
