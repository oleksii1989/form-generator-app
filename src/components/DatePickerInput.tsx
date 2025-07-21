import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: Date | null;
  onChange: (fieldName: string, value: Date | null) => void;
  isInvalid: boolean;
}

export default function DatePickerInput({
  data,
  value,
  onChange,
  isInvalid,
}: Props) {
  return (
    <>
      <label className="label">{data.title}</label>
      <div className="control">
        <DatePicker
          selected={value}
          onChange={(
            date: Date | null,
            _event?: React.SyntheticEvent<HTMLElement>
          ) => onChange(data.fieldName, date)}
          className={`input ${isInvalid ? "is-danger" : ""}`}
          dateFormat="yyyy-MM-dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          placeholderText={data.helpText || `Select ${data.title}`}
        />
      </div>
      {isInvalid && <p className="help is-danger">This field is required</p>}
      {data.helpText && !isInvalid && <p className="help">{data.helpText}</p>}
    </>
  );
}
