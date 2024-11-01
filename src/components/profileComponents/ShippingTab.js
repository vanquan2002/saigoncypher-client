import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../loadingError/Error";
import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { updateProfile } from "../../redux/actions/UserActions";
import { PiWarningCircleLight } from "react-icons/pi";
import {
  DISTRICT_DATA_RESET,
  WARD_DATA_RESET,
} from "../../redux/constants/FormConstants";
import {
  listDistrict,
  listProvince,
  listWard,
} from "../../redux/actions/FormActions";
import SmallModal from "../modals/SmallModal";
import { AppContext } from "../../AppContext";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/UserConstants";

const ShippingTab = ({ result }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUserUpdate, success } = userUpdate;
  const provinceList = useSelector((state) => state.provinceList);
  const {
    loading: loadingProvinceList,
    provinces,
    error: errorProvince,
  } = provinceList;
  const districtList = useSelector((state) => state.districtList);
  const {
    loading: loadingDistrictList,
    districts,
    error: errorDistrict,
  } = districtList;
  const wardList = useSelector((state) => state.wardList);
  const { loading: loadingWardList, wards, error: errorWard } = wardList;
  const [isInitialDistrict, setIsInitialDistrict] = useState(true);
  const [isInitialWard, setIsInitialWard] = useState(true);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [typeModal, setTypeModal] = useState("");
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  const debouncedUpdateProfile = useMemo(
    () =>
      debounce((result) => {
        dispatch(updateProfile(result));
      }, 200),
    []
  );
  const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = "Thông tin bắt buộc";
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
      fullName: userInfo.deliveryInformation.fullName ?? "",
      address: userInfo.deliveryInformation.address ?? "",
      phone: userInfo.deliveryInformation.phone ?? "",
      province: "",
      district: "",
      ward: "",
    },
    validate,
    onSubmit: (values) => {
      if (isSmallModal) {
        toggleIsSmallModal("");
      }
      if (typeModal) {
        setTypeModal("");
      }
      debouncedUpdateProfile(values);
    },
  });

  useEffect(() => {
    if (districts.length > 0 && isDistrict) {
      formik.setFieldValue(
        "district",
        userInfo.deliveryInformation.district ?? ""
      );
      setIsDistrict(false);
    }
  }, [districts, isDistrict]);

  useEffect(() => {
    if (wards.length > 0 && isWard) {
      formik.setFieldValue("ward", userInfo.deliveryInformation.ward ?? "");
      setIsWard(false);
    }
  }, [wards, isWard]);

  useEffect(() => {
    if (formik.values.province) {
      if (isInitialDistrict) {
        setIsInitialDistrict(false);
        setIsDistrict(true);
      } else {
        formik.setFieldValue("district", "");
      }
      const provinceId =
        provinces.find((item) => item.province_name === formik.values.province)
          ?.province_id || null;
      dispatch({
        type: DISTRICT_DATA_RESET,
      });
      setSelectedProvince(provinceId);
    }
  }, [formik.values.province]);

  useEffect(() => {
    if (selectedProvince) {
      dispatch(listDistrict(selectedProvince));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (formik.values.district) {
      if (isInitialWard) {
        setIsInitialWard(false);
        setIsWard(true);
      } else {
        formik.setFieldValue("ward", "");
      }
      const districtId =
        districts.find((item) => item.district_name === formik.values.district)
          ?.district_id || null;
      dispatch({
        type: WARD_DATA_RESET,
      });
      setSelectedDistrict(districtId);
    }
  }, [formik.values.district]);

  useEffect(() => {
    if (selectedDistrict) {
      dispatch(listWard(selectedDistrict));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (provinces.length > 0 && result) {
      formik.setFieldValue(
        "province",
        userInfo.deliveryInformation.province ?? ""
      );
    }
  }, [provinces, result]);

  useEffect(() => {
    if (result) {
      dispatch(listProvince());
    }
  }, [result]);

  useEffect(() => {
    if (success) {
      toggleIsSmallModal("Cập nhật địa chỉ đạt hàng thành công!");
      setTypeModal("update_shipping");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [success]);

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10  ${result ? "block" : "hidden"}`}
    >
      {errorProvince || errorDistrict || errorWard ? (
        <div className="mt-5 md:mt-10">
          <Error error="API calling delivery location is having problems, please contact admin!" />
        </div>
      ) : (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-9 lg:gap-y-10">
          <div className="relative h-11 col-span-1">
            <input
              type="text"
              aria-label="Nhập họ và tên của bạn"
              id="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Nguyễn văn A"
              className="w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none"
            />
            <label
              htmlFor="fullName"
              className="absolute left-0 -top-1.5 text-sm lowercase"
            >
              Họ và tên
            </label>
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.fullName}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 col-span-1">
            <input
              type="tel"
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
              className={`w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none ${
                loadingProvinceList ? "opacity-30 animate-pulse" : "opacity-100"
              }`}
            >
              {!formik.values.province && <option value="">--</option>}
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
              className={`w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none ${
                loadingDistrictList ? "opacity-30 animate-pulse" : "opacity-100"
              }`}
            >
              {!formik.values.district && <option value="">--</option>}
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
              className={`w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none ${
                loadingWardList ? "opacity-30 animate-pulse" : "opacity-100"
              }`}
            >
              {!formik.values.ward && <option value="">--</option>}
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
              type="text"
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

          <div className="col-span-1 lg:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={formik.handleSubmit}
              aria-label="Cập nhật thông tin đặt hàng và đi đến trang thanh toán"
              className="w-full lg:w-[calc(50%-40px)] h-10 lowercase bg-black text-white hover:underline"
            >
              {loadingUserUpdate ? "Đang cập nhật..." : "Cập nhật."}
            </button>
          </div>
        </form>
      )}

      <SmallModal result={typeModal === "update_shipping"} type="" />
    </section>
  );
};

export default ShippingTab;
