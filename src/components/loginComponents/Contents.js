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
import MessageModal from "../MessageModal";

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
    if (error) {
      toggleIsMassage("login");
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
    <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap mt-14 md:mt-32 w-full px-5 md:gap-x-14 md:px-14 lg:gap-x-[8vw] lg:px-[8vw]">
      <div className="w-full">
        <p className="uppercase text-base md:text-lg">
          Truy cập vào tài khoản của bạn
        </p>
        <form className="w-ful flex flex-col gap-12 mt-6">
          <div className="relative h-11 min-[10px] w-full">
            <input
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder=""
              className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-black focus:outline-0 disabled:border-0 disabled:bg-black placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="uppercase after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] leading-tight text-darkPrimary transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] peer-focus:leading-tight peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent">
              Địa chỉ email
            </label>
            {formik.touched.email && formik.errors.email ? (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              </div>
            ) : null}
          </div>
          <div className="relative h-11 min-[10px] w-full">
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="cursor-pointer absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-0 -translate-y-2/4"
            >
              {passwordVisible ? (
                <BsEye size="1.2rem" />
              ) : (
                <BsEyeSlash size="1.2rem" />
              )}
            </div>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder=""
              className={`${
                !passwordVisible && "font-serif tracking-wider"
              } peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 text-sm text-black outline outline-0 transition-all placeholder-shown:border-black focus:border-black focus:outline-0 disabled:border-0 disabled:bg-black placeholder:opacity-0 focus:placeholder:opacity-100`}
            />
            <label className="uppercase after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] leading-tight text-darkPrimary transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] peer-focus:leading-tight peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent">
              Mật khẩu
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="flex items-center gap-1 mt-1">
                <PiWarningCircleLight className="text-red-500" />
                <span className="text-xs text-red-500">
                  {formik.errors.password}
                </span>
              </div>
            ) : null}
          </div>
          <div
            onClick={formik.handleSubmit}
            className="text-black hover:text-opacity-60 duration-200 cursor-pointer flex justify-center mt-3 md:mt-6 border border-black py-[0.6rem]"
          >
            <button type="submit" className="text-[13px] uppercase">
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
        <p className="text-xs underline mt-5">Qúy khách quên mật khẩu?</p>
      </div>
      <div className="h-80 min-w-[1px] bg-black hidden md:block"></div>
      <div className="w-full flex flex-col mt-28 md:mt-0">
        <p className="uppercase text-base md:text-lg text-left">
          Quý khách cần một tài khoản?
        </p>
        <div
          onClick={() =>
            navigate(redirect ? `/register?redirect=${redirect}` : "/register")
          }
          className="text-black hover:text-opacity-60 duration-200 cursor-pointer flex justify-center mt-6 md:mt-8 border border-black py-[0.6rem]"
        >
          <button type="submit" className="text-[13px] uppercase">
            Đăng Ký
          </button>
        </div>
      </div>

      <MessageModal message="Email hoặc mật khẩu không đúng!" />
    </div>
  );
};

export default Contents;
