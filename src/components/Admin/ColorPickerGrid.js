// not use this concept for color picker 
// import React from "react";
// import "./ColorPickerGrid.css";

// const pastelColors = [
//   "#FFEBEE", "#FFF3E0", "#FFFDE7", "#F1F8E9", "#E8F5E9", "#E0F7FA",
//   "#E3F2FD", "#F3E5F5", "#FCE4EC", "#FBE9E7", "#F9FBE7", "#E0F2F1",
//   "#E8EAF6", "#FFF9C4", "#D1C4E9", "#C8E6C9", "#DCEDC8",
//   "#F8BBD0", "#FFCDD2", "#FFECB3", "#E1BEE7"
// ];

// const uniqueColors = [...new Set(pastelColors)];

// const ColorPickerGrid = ({ label, selectedColor, onChange }) => {
//   return (
//     <div className="color-picker-wrapper">
//       <label className="color-label">{label}</label>
//       <div className="color-picker-grid">
//         {uniqueColors.map((color, index) => (
//           <div
//             key={index}
//             className={`color-square ${selectedColor === color ? "selected" : ""}`}
//             style={{ backgroundColor: color }}
//             onClick={() => onChange(color)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColorPickerGrid;
