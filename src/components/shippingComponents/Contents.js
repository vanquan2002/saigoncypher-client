import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PiWarningCircleLight } from "react-icons/pi";
import { useFormik } from "formik";
import axios from "axios";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "/cart" },
    { name: "Thông tin giao hàng", url: "" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Thông tin bắt buộc";
    }
    if (!values.address) {
      errors.address = "Thông tin bắt buộc";
    }
    if (!values.province) {
      errors.province = "Thông tin bắt buộc";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      province: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("address success: ", values);
    },
  });

  useEffect(() => {
    axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Nhập thông tin cá nhân của bạn.
      </h3>

      <div className="mt-5 md:mt-10">
        <form className="flex flex-col gap-10">
          <div className="relative h-11 w-full">
            <input
              aria-label="Nhập họ và tên của bạn"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder=""
              className="peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent"
            />
            <label
              htmlFor="name"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
            >
              Họ và tên
            </label>
            {formik.touched.name && formik.errors.name && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.name}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 w-full">
            <input
              aria-label="Nhập địa chỉ của bạn"
              id="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder=""
              className="peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent"
            />
            <label
              htmlFor="address"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
            >
              Địa chỉ
            </label>
            {formik.touched.address && formik.errors.address && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.address}
                </span>
              </div>
            )}
          </div>

          <div className="relative w-full h-11">
            <select
              aria-label="Chọn tỉnh/thành"
              id="province"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
              className="peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent"
            >
              <option value="">--</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
            <label
              htmlFor="province"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
            >
              Tỉnh/Thành phố
            </label>
            {formik.touched.province && formik.errors.province && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.province}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="mt-6 py-2.5 lowercase hover:underline border border-black"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contents;
