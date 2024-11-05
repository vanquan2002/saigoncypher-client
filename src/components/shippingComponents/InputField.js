import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";

const InputField = ({ item, formik }) => (
  <li className="relative h-11 col-span-1">
    <input
      type={item.type}
      aria-label={item.ariaLabel}
      id={item.value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[item.value]}
      placeholder={item.placeholderText}
      className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
    />
    <label
      htmlFor={item.value}
      className="absolute left-0 -top-1.5 text-sm lowercase"
    >
      {item.contents}
    </label>
    {formik.touched[item.value] && formik.errors[item.value] && (
      <div className="flex items-center gap-1 mt-1">
        <PiWarningCircleLight className="text-red-500" />
        <span className="text-xs text-red-500">
          {formik.errors[item.value]}
        </span>
      </div>
    )}
  </li>
);

export default InputField;
