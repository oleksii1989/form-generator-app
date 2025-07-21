import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerInput() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="field">
      <label className="label">Label</label>
      <div className="control">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="input"
          wrapperClassName="date-picker-wrapper"
          popperClassName="date-picker-popper"
          calendarClassName="date-picker-calendar"
        />
      </div>
    </div>
  );
}
