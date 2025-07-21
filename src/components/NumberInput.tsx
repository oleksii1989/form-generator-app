import React, { useState } from "react";
import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  isInvalid: boolean;
}

export default function NumberInput({
  data,
  value,
  onChange,
  isInvalid,
}: Props) {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setLocalError(null);
      onChange(data.fieldName, inputValue);
      return;
    }

    if (/^-?\d+$/.test(inputValue)) {
      setLocalError(null);
      onChange(data.fieldName, inputValue);
    } else {
      setLocalError("Please enter a valid integer");
    }
  };

  return (
    <>
      <label className="label">{data.title}</label>
      <div className="control">
        <input
          className={`input ${isInvalid ? "is-danger" : ""}`}
          type="number"
          step="1"
          value={value}
          onChange={handleInputChange}
          placeholder={data.helpText || `Enter ${data.title.toLowerCase()}`}
        />
      </div>
      {isInvalid && <p className="help is-danger">This field is required</p>}
      {localError && <p className="help is-danger">{localError}</p>}
      {data.helpText && !isInvalid && !localError && (
        <p className="help">{data.helpText}</p>
      )}
    </>
  );
}
