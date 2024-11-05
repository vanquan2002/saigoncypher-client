import { useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import debounce from "lodash.debounce";
import { profile, updateProfile } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../AppContext";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_RESET,
} from "../../redux/constants/UserConstants";
import SmallModal from "../modals/SmallModal";
import MessageModal from "../modals/MessageModal";

const ProfileTab = ({ result }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const {
    user,
    loading: loadingDetailsUser,
    error: errorDetailsUser,
  } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdateUser,
    successType,
    error: errorUpdateUser,
  } = userUpdate;
  const [typeModal, setTypeModal] = useState("");
  const { toggleIsMassage, isSmallModal, toggleIsSmallModal } =
    useContext(AppContext);
  const itemInputForm = [
    {
      type: "text",
      ariaLabel: "Nhập họ và tên của bạn",
      value: "name",
      contents: "Họ và tên",
    },
    {
      type: "email",
      ariaLabel: "Nhập email của bạn",
      value: "email",
      contents: "Địa chỉ email",
    },
    {
      type: passwordVisible ? "text" : "password",
      ariaLabel: "Nhập mật khẩu của bạn",
      value: "password",
      contents: "Mật khẩu",
    },
  ];

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
      name: "",
      email: "",
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
    if (errorUpdateUser) {
      toggleIsMassage(errorUpdateUser);
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [errorUpdateUser]);

  useEffect(() => {
    if (user.name) {
      formik.setFieldValue("name", user.name);
    }
    if (user.email) {
      formik.setFieldValue("email", user.email);
    }
  }, [user]);

  useEffect(() => {
    if (result) {
      if (user.name || user.email) {
        dispatch({ type: USER_DETAILS_RESET });
      }
      dispatch(profile());
    }
  }, [result]);

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10 ${result ? "block" : "hidden"}`}
    >
      {loadingDetailsUser ? (
        <span>loading...</span>
      ) : errorDetailsUser ? (
        <span>error</span>
      ) : (
        <form className="">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
            {itemInputForm.map((item, i) => (
              <li key={i} className="relative h-11 col-span-1">
                <input
                  type={item.type}
                  aria-label={item.ariaLabel}
                  id={item.value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[item.value]}
                  placeholder=""
                  className={`${
                    i === 2 && !passwordVisible && "font-serif tracking-wider"
                  } peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent`}
                />
                <label
                  htmlFor={item.value}
                  className="pointer-events-none absolute left-0 -top-1.5 text-sm lowercase transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
                >
                  {item.contents}
                </label>
                {i !== 2 &&
                  formik.touched[item.value] &&
                  formik.errors[item.value] && (
                    <div className="flex items-center gap-1 mt-1">
                      <PiWarningCircleLight className="text-red-500" />
                      <span className="text-xs text-red-500">
                        {formik.errors[item.value]}
                      </span>
                    </div>
                  )}
                {i === 2 && (
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
                )}
              </li>
            ))}
          </ul>

          <div className="mt-7 md:mt-10 flex justify-end">
            <button
              type="button"
              onClick={formik.handleSubmit}
              aria-label="Cập nhật thông tin cá nhân"
              className="w-2/5 md:w-1/5 lg:w-1/6 py-2 lowercase bg-black text-white text-sm hover:underline"
            >
              {loadingUpdateUser ? "Đang cập nhật..." : "Cập nhật."}
            </button>
          </div>
        </form>
      )}

      <MessageModal type="" />
      <SmallModal result={typeModal === "update_info"} type="" />
    </section>
  );
};

export default ProfileTab;
