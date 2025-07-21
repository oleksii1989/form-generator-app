import { FormField } from "../utils/parseFormSpec";

interface Props {
  data: FormField;
  value: string;
  onChange: (fieldName: string, value: string) => void;
}

export default function CommentInput({ data, value, onChange }: Props) {
  return (
    <>
      <div className="control mt-3">
        <textarea
          className="textarea"
          value={value}
          onChange={(e) => onChange(data.commentFieldName!, e.target.value)}
          placeholder={`Enter any comments regarding ${data.title.toLowerCase()}..`}
        />
      </div>
    </>
  );
}
