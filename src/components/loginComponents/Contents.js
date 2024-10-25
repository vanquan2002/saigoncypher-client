import React, { useContext, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useFormik } from "formik";
import { PiWarningCircleLight } from "react-icons/pi";
import { login } from "../../redux/actions/UserActions";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT } from "../../redux/constants/UserConstants";
import { AppContext } from "../../AppContext";
import MessageModal from "../modals/MessageModal";
import { Link } from "react-router-dom";

const Contents = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const redirect = useLocation().search.split("=")[1] || "";
  const { toggleIsMassage } = useContext(AppContext);
  const validate = (values) => {
    const errors = {};
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
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(login(values.email, values.password));
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (error) {
      toggleIsMassage("login");
      dispatch({
        type: USER_LOGOUT,
      });
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect]);

  return (
    <main className="flex flex-col lg:flex-row gap-20 mt-36 md:mt-40 w-full px-5 md:px-20">
      <section className="w-full">
        <h2 className="lowercase text-center text-lg md:text-xl lg:text-2xl">
          Truy cập vào tài khoản của bạn.
        </h2>
        <form className="w-ful flex flex-col gap-12 mt-6">
          <div className="relative h-11 w-full">
            <input
              type="email"
              aria-label="Nhập email tài khoản của bạn"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder=""
              className="peer w-full h-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm outline-none placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="lowercase pointer-events-none absolute left-0 -top-1.5 text-sm transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
            >
              Địa chỉ email
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="lowercase text-xs text-red-500">
                  {formik.errors.email}
                </span>
              </div>
            )}
          </div>

          <div className="relative h-11 w-full">
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
            <input
              aria-label="Nhập mật khẩu tài khoản của bạn"
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
              className="lowercase pointer-events-none absolute left-0 -top-1.5 text-sm transition-all peer-placeholder-shown:leading-[4.7] leading-tight peer-focus:leading-tight"
            >
              Mật khẩu
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="lowercase text-xs text-red-500">
                  {formik.errors.password}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="mt-6 py-2.5 lowercase hover:underline border border-black"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập."}
          </button>
        </form>
        <button type="button" className="lowercase text-xs underline mt-3">
          Qúy khách quên mật khẩu?
        </button>
      </section>

      <div className="md:border-b lg:border-l border-black"></div>

      <section className="w-full">
        <h2 className="lowercase text-center text-lg md:text-xl lg:text-2xl">
          Quý khách cần một tài khoản?
        </h2>
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          type="submit"
          className="w-full mt-8 py-2.5 text-center lowercase hover:underline border border-black"
        >
          Đăng Ký.
        </Link>
      </section>

      <MessageModal message="Email hoặc mật khẩu không đúng!" />
    </main>
  );
};

export default Contents;
