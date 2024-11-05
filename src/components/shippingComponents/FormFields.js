import React from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

const FormFields = ({
  itemInputForm,
  itemSelectForm,
  formik,
  provinces,
  districts,
  wards,
}) => (
  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
    {itemInputForm.slice(0, 2).map((item, i) => (
      <InputField key={i} item={item} formik={formik} />
    ))}

    {itemSelectForm.map((item) => (
      <SelectField
        key={item.value}
        item={item}
        formik={formik}
        options={
          item.arrName === "provinces"
            ? provinces
            : item.arrName === "districts"
            ? districts
            : wards
        }
      />
    ))}

    {itemInputForm.slice(-1).map((item, i) => (
      <InputField key={i} item={item} formik={formik} />
    ))}
  </ul>
);

export default FormFields;
