import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";

const SelectField = ({ item, formik, options }) => (
  <li className="relative h-11 col-span-1">
    <select
      aria-label={item.ariaLabel}
      id={item.value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[item.value]}
      className={`w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none ${
        item.loadingList ? "opacity-30 animate-pulse" : "opacity-100"
      }`}
    >
      {!formik.values[item.value] && <option value="">--</option>}
      {options.map((location) => (
        <option key={location.code} value={location.name}>
          {location.name}
        </option>
      ))}
    </select>
    <label
      htmlFor={item.value}
      className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase"
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

export default SelectField;
