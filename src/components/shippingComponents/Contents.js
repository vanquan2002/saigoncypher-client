import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PiWarningCircleLight } from "react-icons/pi";
import { useFormik } from "formik";
import { MdChevronLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import {
  listDistrict,
  listProvince,
  listWard,
} from "../../redux/actions/FormActions";
import {
  DISTRICT_DATA_RESET,
  WARD_DATA_RESET,
} from "../../redux/constants/FormConstants";
import Error from "../loadingError/Error";
import { updateProfile } from "../../redux/actions/UserActions";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/UserConstants";
import debounce from "lodash.debounce";
import FormFields from "./FormFields";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "/cart" },
    { name: "Thông tin đặt hàng", url: "" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const quantity = cartItems.reduce((a, i) => a + i.qty, 0);
  const [isInitialDistrict, setIsInitialDistrict] = useState(true);
  const [isInitialWard, setIsInitialWard] = useState(true);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
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

  const debouncedUpdateProfile = useMemo(
    () =>
      debounce((result) => {
        dispatch(updateProfile(result, 3));
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
    if (provinces.length > 0) {
      formik.setFieldValue(
        "province",
        userInfo.deliveryInformation.province ?? ""
      );
    }
  }, [provinces]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProvince());
  }, []);

  useEffect(() => {
    if (successType === 3) {
      navigate("/placeorder");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [successType]);

  return (
    <main className="px-5 md:px-20">
      <div className="mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Nhập thông tin cá nhân của bạn.
      </h3>
      {errorProvince || errorDistrict || errorWard ? (
        <div className="mt-5 md:mt-10">
          <Error error="API calling delivery location is having problems, please contact admin!" />
        </div>
      ) : (
        <div className="mt-5 md:mt-10">
          <FormFields
            itemInputForm={itemInputForm}
            itemSelectForm={itemSelectForm}
            formik={formik}
            provinces={provinces}
            districts={districts}
            wards={wards}
          />

          <div className="z-10 h-[4.5rem] md:h-28 lg:h-20 fixed bottom-0 left-0 grid grid-cols-5 md:grid-cols-4 lg:grid-cols-7 w-full backdrop-blur-sm bg-white/60 border-t border-gray-300">
            <div className="hidden md:col-span-1 md:flex items-center ml-5">
              <Link
                to="/cart"
                aria-label="Đi đến trang giỏ hàng"
                className="lowercase font-medium text-gray-700 hover:underline flex items-center"
              >
                <MdChevronLeft className="text-2xl mr-[-2px]" />
                Giỏ hàng
              </Link>
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-5 flex flex-col items-end justify-center mr-4 md:mr-6 lg:mr-10">
              <span className="lowercase text-[15px]">
                {quantity} sản phẩm.
              </span>
              <span className="lowercase text-lg font-semibold">
                Tổng: {formatCurrency(total)}
              </span>
            </div>

            <div className="col-span-2 md:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={formik.handleSubmit}
                aria-label="Cập nhật thông tin đặt hàng và đi đến trang thanh toán"
                className="flex items-center justify-center w-full h-full lowercase bg-black text-white text-lg hover:underline"
              >
                {loadingUserUpdate ? "Đang tiếp tục" : "Tiếp tục"}
                <MdKeyboardArrowRight className="text-2xl ml-[-2px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contents;
