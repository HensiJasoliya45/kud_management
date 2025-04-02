import React from "react";
import "./SilakTable.css"; 

const SilakTable = ({ data, handleCellChange }) => {
  return (
    <table className="account-table">
      <thead>
        <tr>
          <th rowSpan="2">નોટ</th>
          <th colSpan="2">sahitya X1ની સિલક</th>
          <th colSpan="2">A sheetની  સિલક</th>
          <th colSpan="2">Alpahar</th>
          <th colSpan="2">અન્ય સિલક</th>
          <th colSpan="2">કવર -૧</th>
          <th colSpan="2">પ્રોજેક્ટ</th>
        </tr>
        <tr>
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index}>
              <th>નંગ</th>
              <th>રકમ</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                {colIndex % 2 === 1 && rowIndex !== data.length - 1 ? (
                  <input
                    type="text"
                    value={data[rowIndex][colIndex]}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    onBlur={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
       
      </tbody>
    </table>
  );
};

export default SilakTable;
