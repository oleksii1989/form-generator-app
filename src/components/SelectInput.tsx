import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  isInvalid: boolean;
}

export default function SelectInput({
  data,
  value,
  onChange,
  isInvalid,
}: Props) {
  const options = data.dropVals ? JSON.parse(data.dropVals) : {};

  return (
    <>
      <label className="label">{data.title}</label>
      <div className="control">
        <div className={`select ${isInvalid ? "is-danger" : ""}`}>
          <select
            value={value}
            onChange={(e) => onChange(data.fieldName, e.target.value)}
          >
            {Object.keys(options).map((key) => (
              <option key={key} value={key}>
                {options[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isInvalid && <p className="help is-danger">This field is required</p>}
      {data.helpText && !isInvalid && <p className="help">{data.helpText}</p>}
    </>
  );
}
