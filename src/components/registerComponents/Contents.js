import React, { useContext, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useFormik } from "formik";
import { PiWarningCircleLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../../AppContext";
import { USER_LOGOUT } from "../../redux/constants/UserConstants";
import { register } from "../../redux/actions/UserActions";
import { Link } from "react-router-dom";
import MessageModal from "../modals/MessageModal";

const Contents = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useLocation().search.split("=")[1] || "";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const { toggleIsMassage } = useContext(AppContext);
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
    if (!values.password) {
      errors.password = "Thông tin bắt buộc";
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
      dispatch(register(values.name, values.email, values.password));
    },
  });

  useEffect(() => {
    if (error) {
      toggleIsMassage("register");
      dispatch({
        type: USER_LOGOUT,
      });
    }
  }, [error]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect]);

  return (
    <main className="flex flex-col lg:flex-row gap-20 mt-36 md:mt-40 w-full px-5 md:px-20">
      <section className="w-full">
        <h2 className="lowercase text-center text-lg md:text-xl lg:text-2xl">
          Nhập thông tin cá nhân.
        </h2>
        <form className="w-ful flex flex-col gap-12 mt-6">
          <div className="relative h-11 w-full">
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
                <span className="text-xs text-red-500">
                  {formik.errors.name}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 w-full">
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

          <div className="relative h-11 w-full">
            <input
              aria-label="Nhập mật khẩu của bạn"
              id="password"
              type={passwordVisible ? "text" : "password"}
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

          <button
            type="button"
            onClick={formik.handleSubmit}
            className="mt-6 py-2.5 lowercase hover:underline border border-black"
          >
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản."}
          </button>
        </form>
      </section>

      <div className="md:border-b lg:border-l border-black"></div>

      <section className="w-full">
        <h2 className="lowercase text-center text-lg md:text-xl lg:text-2xl">
          Quý khách đã có tài khoản?
        </h2>
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
          type="submit"
          className="w-full mt-8 py-2.5 text-center lowercase hover:underline border border-black"
        >
          Đăng nhập.
        </Link>
      </section>

      <MessageModal message="Email đã tồn tại!" />
    </main>
  );
};

export default Contents;
