import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: File | null;
  onChange: (fieldName: string, value: File | null) => void;
  isInvalid: boolean;
  isOptional?: boolean;
}

export default function PhotoInput({
  data,
  value,
  onChange,
  isInvalid,
  isOptional,
}: Props) {
  return (
    <>
      {!isOptional && <label className="label">{data.title}</label>}
      <div className={`control ${isOptional ? "mt-3" : ""}`}>
        <div className="file has-name is-info">
          <label className="file-label">
            <input
              className={`file-input  ${isInvalid ? "is-danger" : ""}`}
              type="file"
              accept="image/*"
              onChange={(e) =>
                onChange(
                  data.fieldName,
                  e.target.files ? e.target.files[0] : null
                )
              }
            />
            <span className="file-cta">
              <span className="file-label">
                {" "}
                Add {data.title.toLowerCase()}{" "}
              </span>
            </span>
            {value && <span className="file-name">Selected: {value.name}</span>}
          </label>
        </div>
        {isInvalid && <p className="help is-danger">This field is required</p>}
      </div>
    </>
  );
}
