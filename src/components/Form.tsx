import formSpec from "../data/formSpec.json";
import { FormField, parseFormSpec } from "../utils/parseFormSpec";
import CommentInput from "./CommentInput";
import NumberInput from "./NumberInput";
import PhotoInput from "./PhotoInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import DatePickerInput from "./DatePickerInput";

export default function Form() {
  const categories = parseFormSpec(formSpec as FormField[]);

  console.log(categories);

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Aerial Inspection</h1>
      <form>
        <TextInput />
        <NumberInput />
        <SelectInput />
        <CommentInput />
        <PhotoInput />
        <DatePickerInput />

        <div className="field">
          <div className="control">
            <button
              type="submit"
              className="button is-link is-medium is-fullwidth"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
