export interface FormField {
  IDX: number;
  formid: string;
  formName: string;
  systemid: string | null;
  fieldid: string;
  categoryOrder: number;
  fieldOrder: number;
  category: string;
  title: string;
  fieldName: string;
  fieldType: "text" | "numberInt" | "photo" | "select" | "datetime";
  dataType: string;
  dropVals: string | null;
  fillMethod: string | null;
  commentField: number;
  commentFieldName: string | null;
  helpText: string | null;
  requiresPhoto: number;
  visible: number;
  inputReq: number;
  defautVal: string | null;
}

export interface FormCategory {
  category: string;
  fields: FormField[];
}

export function parseFormSpec(formSpec: FormField[]): FormCategory[] {
  const categories: { [key: string]: FormField[] } = {};

  formSpec.forEach((field) => {
    if (field.visible === 1) {
      if (!categories[field.category]) {
        categories[field.category] = [];
      }
      categories[field.category].push(field);
    }
  });

  const categoryArray: FormCategory[] = Object.keys(categories).map(
    (category) => ({
      category,
      fields: categories[category].sort((a, b) => a.fieldOrder - b.fieldOrder),
    })
  );

  return categoryArray.sort(
    (a, b) => a.fields[0].categoryOrder - b.fields[0].categoryOrder
  );
}
