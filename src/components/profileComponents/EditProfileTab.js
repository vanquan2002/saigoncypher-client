import { useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import debounce from "lodash.debounce";
import { profile, updateProfile } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../AppContext";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/UserConstants";
import SmallModal from "../modals/SmallModal";
import MessageModal from "../modals/MessageModal";

const EditProfileTab = ({ result }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, successType, error } = userUpdate;
  const [typeModal, setTypeModal] = useState("");
  const { toggleIsMassage, isSmallModal, toggleIsSmallModal } =
    useContext(AppContext);

  const debouncedUpdateProfile = useMemo(
    () =>
      debounce((result) => {
        dispatch(updateProfile(result, 1));
      }, 200),
    []
  );
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Thông tin bắt buộc";
    }
    if (!values.email) {
      errors.email = "Thông tin bắt buộc";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Địa chỉ email không hợp lệ";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: userInfo.name ?? "",
      email: userInfo.email ?? "",
      password: "",
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
    if (successType === 1) {
      // dispatch(profile());
      toggleIsSmallModal("Cập nhật thông tin cá nhân thành công!");
      setTypeModal("update_info");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    } else {
      if (typeModal) {
        setTypeModal("");
      }
    }
  }, [successType]);

  useEffect(() => {
    if (error) {
      toggleIsMassage(error);
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [error]);

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10 ${result ? "block" : "hidden"}`}
    >
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
        <div className="relative h-11 col-span-1">
          <input
            type="text"
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
              <span className="text-xs text-red-500">{formik.errors.name}</span>
            </div>
          )}
        </div>

        <div className="relative h-11 col-span-1">
          <input
            type="email"
            aria-label="Nhập email của bạn"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder=""
            className="peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
          >
            Địa chỉ email
          </label>
          {formik.touched.email && formik.errors.email && (
            <div className="flex items-center gap-1 mt-1">
              <PiWarningCircleLight className="text-red-500" />
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            </div>
          )}
        </div>

        <div className="relative h-11 col-span-1">
          <input
            type={passwordVisible ? "text" : "password"}
            aria-label="Nhập mật khẩu của bạn"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder=""
            className={`${
              !passwordVisible && "font-serif tracking-wider"
            } peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent`}
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
          >
            Mật khẩu
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="flex items-center gap-1 mt-1">
              <PiWarningCircleLight className="text-red-500" />
              <span className="text-xs text-red-500">
                {formik.errors.password}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-0 bottom-2"
          >
            {passwordVisible ? (
              <BsEye size="1.2rem" />
            ) : (
              <BsEyeSlash size="1.2rem" />
            )}
          </button>
        </div>

        <div className="col-span-1 lg:col-span-2 flex justify-end">
          <button
            type="button"
            onClick={formik.handleSubmit}
            aria-label="Cập nhật thông tin cá nhân"
            className="w-1/2 md:w-1/3 lg:w-1/6 py-2 lowercase bg-black text-white text-sm hover:underline"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật."}
          </button>
        </div>
      </form>

      <MessageModal type="" />
      <SmallModal result={typeModal === "update_info"} type="" />
    </section>
  );
};

export default EditProfileTab;
