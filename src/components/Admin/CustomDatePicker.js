import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    console.log("Selected Date Range:", { startDate: start, endDate: end,});
};

  return (
    <div className="custom-date-picker-group">
      <label>Choose Date Range</label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange} 
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
};

export default DateRangePicker;
