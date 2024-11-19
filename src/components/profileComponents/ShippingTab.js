import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../loadingError/Error";
import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { profile, updateProfile } from "../../redux/actions/UserActions";
import {
  PROVINCE_DATA_RESET,
  DISTRICT_DATA_RESET,
  WARD_DATA_RESET,
} from "../../redux/constants/FormConstants";
import {
  listDistrict,
  listProvince,
  listWard,
} from "../../redux/actions/FormActions";
import { AppContext } from "../../AppContext";
import FormFields from "./../shippingComponents/FormFields";
import ShippingTabSkeleton from "../skeletons/ShippingTabSkeleton";

const ShippingTab = ({ result }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const {
    user,
    loading: loadingUserDetails,
    error: errorUserDetails,
  } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUserUpdate } = userUpdate;
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
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);
  const [isInitialDistrict, setIsInitialDistrict] = useState(true);
  const [isInitialWard, setIsInitialWard] = useState(true);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isWard, setIsWard] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
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
      fullName: "",
      address: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
    },
    validate,
    onSubmit: (values) => {
      if (isSmallModal) {
        toggleIsSmallModal("");
      }
      debouncedUpdateProfile(values);
    },
  });

  useEffect(() => {
    if (
      districts.length > 0 &&
      isDistrict &&
      user.deliveryInformation &&
      user.deliveryInformation.district
    ) {
      formik.setFieldValue("district", user.deliveryInformation.district ?? "");
      setIsDistrict(false);
    }
  }, [districts, isDistrict, user]);

  useEffect(() => {
    if (
      wards.length > 0 &&
      isWard &&
      user.deliveryInformation &&
      user.deliveryInformation.ward
    ) {
      formik.setFieldValue("ward", user.deliveryInformation.ward ?? "");
      setIsWard(false);
    }
  }, [wards, isWard, user]);

  useEffect(() => {
    if (formik.values.province) {
      if (isInitialDistrict) {
        setIsInitialDistrict(false);
        setIsDistrict(true);
      } else {
        formik.setFieldValue("district", "");
      }
      const provinceId =
        provinces.find((item) => item.name === formik.values.province)?.code ||
        null;
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
        districts.find((item) => item.name === formik.values.district)?.code ||
        null;
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
    if (
      provinces.length > 0 &&
      user.deliveryInformation &&
      user.deliveryInformation.province
    ) {
      formik.setFieldValue("province", user.deliveryInformation.province ?? "");
    }
  }, [provinces, user]);

  useEffect(() => {
    if (user.deliveryInformation && user.deliveryInformation.fullName) {
      formik.setFieldValue("fullName", user.deliveryInformation.fullName);
    }
    if (user.deliveryInformation && user.deliveryInformation.address) {
      formik.setFieldValue("address", user.deliveryInformation.address);
    }
    if (user.deliveryInformation && user.deliveryInformation.phone) {
      formik.setFieldValue("phone", user.deliveryInformation.phone);
    }
  }, [user]);

  useEffect(() => {
    if (result) {
      dispatch(profile());
      dispatch(listProvince());
    }
  }, [result]);

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10 ${result ? "block" : "hidden"}`}
    >
      {loadingUserDetails ? (
        <ShippingTabSkeleton />
      ) : errorUserDetails ? (
        <div className="mt-5 md:mt-10">
          <Error error={errorUserDetails} />
        </div>
      ) : errorProvince || errorDistrict || errorWard ? (
        <div className="mt-5 md:mt-10">
          <Error error="API calling delivery location is having problems, please contact admin!" />
        </div>
      ) : (
        <>
          <FormFields
            itemInputForm={itemInputForm}
            itemSelectForm={itemSelectForm}
            formik={formik}
            provinces={provinces}
            districts={districts}
            wards={wards}
          />

          <div className="mt-7 md:mt-10 flex justify-end">
            <button
              type="button"
              onClick={formik.handleSubmit}
              aria-label="Cập nhật thông tin đặt hàng"
              className="w-[44%] md:w-[23%] lg:w-[13%] py-2 lowercase bg-black text-white text-sm hover:underline"
            >
              {loadingUserUpdate ? "Đang cập nhật..." : "Cập nhật."}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ShippingTab;
