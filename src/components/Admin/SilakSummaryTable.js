import React from "react";
import "./SilakSummaryTable.css";

const SilakSummaryTable = () => {
  return (
    <div className="summary-table-container">
      <table className="summary-table small-table-1">
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th>ભૂલ / તફાવતનું કારણ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>તફાવત</td>
            <td>#VALUE!</td>
            <td>SMK</td>
          </tr>
          <tr>
            <td>ભૂલ ની રકમ</td>
            <td>""</td>
            <td></td>
          </tr>
          <tr>
            <td>કુલ તફાવત</td>
            <td>#VALUE!</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="summary-table small-table-2">
        <thead>
          <tr>
            <th colSpan={2}>કુલ સિલક</th>
            <th>0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TB</td>
            <td>hdhgj</td>
            <td>2(D24)</td>
          </tr>
          <tr>
            <td>AB</td>
            <td>jbdjb</td>
            <td>2(D24)</td>
          </tr>
          <tr>
            <td>SB</td>
            <td>ndkjrjbjbfj</td>
            <td>2(D24)</td>
          </tr>
        </tbody>
      </table>

      <table className="summary-table normal-table">
        <thead>
          <tr>
            <th></th>
            <th>કુલ સિલક</th>
            <th>sum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>ગલ્લો</td>
            <td>C28</td>
          </tr>
          <tr>
            <td>B</td>
            <td>તિજોરી</td>
            <td>E28</td>
          </tr>
          <tr>
            <td>C</td>
            <td>છૂટક પરચુરણ</td>
            <td>G28</td>
          </tr>
          <tr>
            <td>D</td>
            <td>અન્ય સિલક</td>
            <td>128</td>
          </tr>
          <tr>
            <td>E</td>
            <td>ઉપલક રકમ</td>
            <td>K28</td>
          </tr>
          <tr>
            <td>F</td>
            <td>પ્રોજેક્ટ રકમ</td>
            <td>M28</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SilakSummaryTable;
