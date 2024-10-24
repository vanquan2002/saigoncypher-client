import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PiWarningCircleLight } from "react-icons/pi";
import { useFormik } from "formik";
import axios from "axios";
import { MdChevronLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "/cart" },
    { name: "Thông tin đặt hàng", url: "" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const quantity = cartItems.reduce((a, i) => a + i.qty, 0);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Thông tin bắt buộc";
    }
    if (!values.address) {
      errors.address = "Thông tin bắt buộc";
    }
    if (!values.phone) {
      errors.phone = "Thông tin bắt buộc";
    }
    if (!values.province) {
      errors.province = "Thông tin bắt buộc";
    }
    if (!values.district) {
      errors.district = "Thông tin bắt buộc";
    }
    if (!values.ward) {
      errors.ward = "Thông tin bắt buộc";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("addressed: ", values);
    },
  });

  useEffect(() => {
    const provinceId =
      provinces.find((item) => item.province_name === formik.values.province)
        ?.province_id || null;
    setSelectedProvince(provinceId);
    formik.setFieldValue("district", "");
    setDistricts([]);
  }, [formik.values.province, provinces]);

  useEffect(() => {
    const districtId =
      districts.find((item) => item.district_name === formik.values.district)
        ?.district_id || null;
    setSelectedDistrict(districtId);
    formik.setFieldValue("ward", "");
    setWards([]);
  }, [formik.values.district, districts]);

  useEffect(() => {
    axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/district/${selectedProvince}`
        )
        .then((response) => {
          setDistricts(response.data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then((response) => {
          setWards(response.data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedDistrict]);

  return (
    <main className="px-5 md:px-20">
      <div className="mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Nhập thông tin cá nhân của bạn.
      </h3>

      <div className="mt-5 md:mt-10">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-9 lg:gap-y-10">
          <div className="relative h-11 col-span-1">
            <input
              aria-label="Nhập họ và tên của bạn"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Nguyễn văn A"
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-1.5 text-sm lowercase"
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

          <div className="relative h-11 col-span-1">
            <input
              aria-label="Nhập số điện thoại của bạn"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="0123456789"
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            />
            <label
              htmlFor="phone"
              className="absolute left-0 -top-1.5 text-sm lowercase"
            >
              Số điện thoại
            </label>
            {formik.touched.phone && formik.errors.phone && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.phone}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 col-span-1">
            <select
              aria-label="Chọn tỉnh/thành"
              id="province"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            >
              <option value="">--</option>
              {provinces.map((item) => (
                <option key={item.province_id} value={item.province_name}>
                  {item.province_name}
                </option>
              ))}
            </select>
            <label
              htmlFor="province"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase"
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

          <div className="relative h-11 col-span-1">
            <select
              aria-label="Chọn quận/huyện"
              id="district"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.district}
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            >
              <option value="">--</option>
              {districts.map((item) => (
                <option key={item.district_id} value={item.district_name}>
                  {item.district_name}
                </option>
              ))}
            </select>
            <label
              htmlFor="district"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase"
            >
              Quận/huyện
            </label>
            {formik.touched.district && formik.errors.district && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.district}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 col-span-1">
            <select
              aria-label="Chọn phường/xã"
              id="ward"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ward}
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            >
              <option value="">--</option>
              {wards.map((item) => (
                <option key={item.ward_id} value={item.ward_name}>
                  {item.ward_name}
                </option>
              ))}
            </select>
            <label
              htmlFor="ward"
              className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase"
            >
              Phường/xã
            </label>
            {formik.touched.ward && formik.errors.ward && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.ward}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 col-span-1">
            <input
              aria-label="Nhập địa chỉ của bạn"
              id="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="12/4 Phạm Văn B"
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            />
            <label
              htmlFor="address"
              className="absolute left-0 -top-1.5 text-sm lowercase"
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
        </form>

        <div className="z-10 h-[4.5rem] md:h-28 lg:h-20 fixed bottom-0 left-0 grid grid-cols-5 md:grid-cols-4 lg:grid-cols-7 w-full backdrop-blur-sm bg-white/60 border-t border-gray-300">
          <div className="hidden md:col-span-1 md:flex items-center ml-5">
            <Link
              to="/cart"
              aria-label="Đi đến trang tất cả sản phẩm"
              className="lowercase font-medium text-gray-700 hover:underline flex items-center"
            >
              <MdChevronLeft className="text-2xl mr-[-2px]" />
              Giỏ hàng
            </Link>
          </div>

          <div className="col-span-3 md:col-span-2 lg:col-span-5 flex flex-col items-end justify-center mr-4 md:mr-6 lg:mr-10">
            <span className="lowercase text-[15px]">{quantity} sản phẩm.</span>
            <span className="lowercase text-lg font-semibold">
              Tổng: {formatCurrency(total)}
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex justify-end">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              aria-label="Đi đến trang nhập địa chỉ giao hàng"
              className="flex items-center justify-center w-full h-full lowercase bg-black text-white text-lg hover:underline"
            >
              Tiếp tục
              <MdKeyboardArrowRight className="text-2xl ml-[-2px]" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contents;
