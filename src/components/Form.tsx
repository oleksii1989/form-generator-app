import formSpec from "../data/formSpec.json";
import { FormField, parseFormSpec } from "../utils/parseFormSpec";

export default function Form() {
  const categories = parseFormSpec(formSpec as FormField[]);

  console.log(categories);

  return (
    <div className="container">
      <h1 className="title">I'm a Form component</h1>
    </div>
  );
}
