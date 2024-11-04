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
  const { loading: loadingUserUpdate, successType } = userUpdate;
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
        dispatch(updateProfile(result, 2));
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
    if (successType === 2) {
      toggleIsSmallModal("Cập nhật địa chỉ đạt hàng thành công!");
      setTypeModal("update_shipping");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    } else {
      if (typeModal) {
        setTypeModal("");
      }
    }
  }, [successType]);

  const itemSelectForm = [
    {
      ariaLabel: "Chọn tỉnh/thành",
      value: "province",
      contents: "Tỉnh/Thành phố",
      arrName: "provinces",
      loadingList: loadingProvinceList,
    },
    {
      ariaLabel: "Chọn quận/huyện",
      value: "district",
      contents: "Quận/huyện",
      arrName: "districts",
      loadingList: loadingDistrictList,
    },
    {
      ariaLabel: "Chọn phường/xã",
      value: "ward",
      contents: "Phường/xã",
      arrName: "wards",
      loadingList: loadingWardList,
    },
  ];

  const itemInputForm = [
    {
      type: "text",
      ariaLabel: "Nhập họ và tên của bạn",
      value: "fullName",
      contents: "Họ và tên",
      placeholderText: "Nguyễn văn A",
    },
    {
      type: "tel",
      ariaLabel: "Nhập số điện thoại của bạn",
      value: "phone",
      contents: "Số điện thoại",
      placeholderText: "0123456789",
    },
    {
      type: "text",
      ariaLabel: "Nhập địa chỉ của bạn",
      value: "address",
      contents: "Địa chỉ",
      placeholderText: "12/4 Phạm Văn B",
    },
  ];

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10 ${result ? "block" : "hidden"}`}
    >
      {errorProvince || errorDistrict || errorWard ? (
        <div className="mt-5 md:mt-10">
          <Error error="API calling delivery location is having problems, please contact admin!" />
        </div>
      ) : (
        <form className="">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
            {itemInputForm.slice(0, 2).map((item, i) => (
              <li key={i} className="relative h-11 col-span-1">
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
            ))}

            {itemSelectForm.map((item) => (
              <li key={item.value} className="relative h-11 col-span-1">
                <select
                  aria-label={item.ariaLabel}
                  id={item.value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[item.value]}
                  className={`w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none ${
                    item.loadingList
                      ? "opacity-30 animate-pulse"
                      : "opacity-100"
                  }`}
                >
                  {!formik.values[item.value] && <option value="">--</option>}
                  {(item.arrName === "provinces"
                    ? provinces
                    : item.arrName === "districts"
                    ? districts
                    : wards
                  ).map((location) => (
                    <option
                      key={location[`${item.value}_id`]}
                      value={location[`${item.value}_name`]}
                    >
                      {location[`${item.value}_name`]}
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
            ))}

            {itemInputForm.slice(-1).map((item, i) => (
              <li key={i} className="relative h-11 col-span-1">
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
            ))}
          </ul>

          <div className="mt-7 md:mt-10 flex justify-end">
            <button
              type="button"
              onClick={formik.handleSubmit}
              aria-label="Cập nhật thông tin đặt hàng"
              className="px-6 py-2 lowercase bg-black text-white text-sm hover:underline"
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
