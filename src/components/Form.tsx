import formSpec from "../data/formSpec.json";
import { FormField, parseFormSpec } from "../utils/parseFormSpec";
import CommentInput from "./CommentInput";
import NumberInput from "./NumberInput";
import PhotoInput from "./PhotoInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import DatePickerInput from "./DatePickerInput";
import { useState } from "react";
import Notification from "./Notification";

interface FormData {
  [key: string]: string | number | Date | File | null;
}

interface NotificationState {
  message: string;
  type: "success" | "error";
}

export default function Form() {
  const categories = parseFormSpec(formSpec as FormField[]);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const handleChange = (
    fieldName: string,
    value: string | number | Date | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: false }));
    }
    if (notification) {
      setNotification(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    categories.forEach((category) => {
      category.fields.forEach((field) => {
        if (field.inputReq === 1 && !formData[field.fieldName]) {
          newErrors[field.fieldName] = true;
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const filteredFormData = Object.fromEntries(
        Object.entries(formData)
          .filter(([key, value]) => {
            const field = categories
              .flatMap((category) => category.fields)
              .find(
                (f) =>
                  f.fieldName === key ||
                  (f.commentFieldName && f.commentFieldName === key)
              );

            return field?.inputReq === 1 || (value !== "" && value !== null);
          })
          .map(([key, value]) => {
            if (value instanceof File) {
              return [
                key,
                { name: value.name, size: value.size, type: value.type },
              ];
            }
            return [key, value];
          })
      );

      console.log(JSON.stringify(filteredFormData, null, 2));

      setFormData({});
      setNotification({
        message: "Form successfully submitted!",
        type: "success",
      });
    } else {
      setNotification({
        message: "Please fill all required fields.",
        type: "error",
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container is-max-desktop">
      <h1 className="title is-2">{categories[0].fields[0].formName}</h1>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form onSubmit={handleSubmit}>
        {categories.map((category) => (
          <div key={category.category} className="content">
            <hr />
            <h2 className="title">{category.category}</h2>
            {category.fields.map((field) => (
              <div key={field.fieldid} className="field">
                {field.fieldType === "text" && (
                  <TextInput
                    data={field}
                    value={(formData[field.fieldName] as string) || ""}
                    onChange={handleChange}
                    isInvalid={!!errors[field.fieldName]}
                  />
                )}
                {field.fieldType === "numberInt" && (
                  <NumberInput
                    data={field}
                    value={(formData[field.fieldName] as string) || ""}
                    onChange={handleChange}
                    isInvalid={!!errors[field.fieldName]}
                  />
                )}
                {field.fieldType === "select" && (
                  <SelectInput
                    data={field}
                    value={
                      (formData[field.fieldName] as string) ||
                      field.defautVal ||
                      ""
                    }
                    onChange={handleChange}
                    isInvalid={!!errors[field.fieldName]}
                  />
                )}
                {field.fieldType === "datetime" && (
                  <DatePickerInput
                    data={field}
                    value={(formData[field.fieldName] as Date) || null}
                    onChange={handleChange}
                    isInvalid={!!errors[field.fieldName]}
                  />
                )}
                {field.fieldType === "photo" && (
                  <PhotoInput
                    data={field}
                    value={(formData[field.fieldName] as File) || null}
                    onChange={handleChange}
                    isInvalid={!!errors[field.fieldName]}
                  />
                )}
                {field.commentField === 1 && (
                  <CommentInput
                    data={{
                      ...field,
                      commentFieldName:
                        field.commentFieldName || `${field.fieldName}Note`,
                    }}
                    value={
                      (formData[
                        field.commentFieldName || `${field.fieldName}Note`
                      ] as string) || ""
                    }
                    onChange={handleChange}
                  />
                )}
                {field.requiresPhoto === 1 && (
                  <PhotoInput
                    data={{
                      ...field,
                      title: `${field.title} Photo`,
                      fieldName: `${field.fieldName}_photo`,
                    }}
                    value={
                      (formData[`${field.fieldName}_photo`] as File) || null
                    }
                    onChange={handleChange}
                    isInvalid={false}
                    isOptional
                  />
                )}
              </div>
            ))}
          </div>
        ))}
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
