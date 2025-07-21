import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  isInvalid: boolean;
}

export default function TextInput({ data, value, onChange, isInvalid }: Props) {
  return (
    <>
      <label className="label">{data.title}</label>
      <div className="control">
        <input
          className={`input ${isInvalid ? "is-danger" : ""}`}
          type="text"
          value={value}
          onChange={(e) => onChange(data.fieldName, e.target.value)}
          placeholder={`Enter ${data.title.toLowerCase()}`}
        />
      </div>
      {isInvalid && <p className="help is-danger">This field is required</p>}
      {data.helpText && !isInvalid && <p className="help">{data.helpText}</p>}
    </>
  );
}
