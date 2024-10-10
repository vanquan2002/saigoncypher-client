import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/UserActions";
import { AppContext } from "../../AppContext";

const MenuLayout = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { toggleIsBarRight } = useContext(AppContext);

  const logoutHandle = () => {
    dispatch(logout());
    toggleIsBarRight("");
  };

  const navigateHandle = (result) => {
    navigate(`/${result}`);
    toggleIsBarRight("");
  };

  return (
    <div
      className={`bg-white z-30 fixed top-0 right-0 duration-500 w-screen md:w-[500px] h-screen flex flex-col justify-between ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="flex justify-between w-full items-center px-5 py-6">
        <span className="text-darkPrimary font-medium uppercase">Menu</span>
        <button onClick={() => toggleIsBarRight("")}>
          <MdClose aria-label="Đóng menu" className="text-2xl md:text-3xl" />
        </button>
      </div>

      <div className="px-5 h-full flex flex-col justify-between">
        <div>
          {userInfo ? (
            <div className="mt-6 text-sm">
              <div className="flex justify-between items-center border-b pb-2 border-black">
                <span className="w-2/5">Xin chào:</span>
                <span className="w-3/5 text-right line-clamp-1">
                  {userInfo.name}
                </span>
              </div>
              <div className="flex flex-col items-start mt-3">
                <Link
                  to="/profile"
                  aria-label="Đi đến trang thông tin tài khoản cá nhân"
                  className="hover:underline"
                >
                  Tài khoản
                </Link>
                <button
                  onClick={() => logoutHandle()}
                  className="hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-sm">
              <p
                className="hover:underline cursor-pointer"
                onClick={() => navigateHandle("login")}
              >
                Đăng nhập
              </p>
              <p
                className="hover:underline cursor-pointer"
                onClick={() => navigateHandle("register")}
              >
                Đăng kí
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col items-start text-[13px] mt-10">
            <p className="hover:underline cursor-pointer">Tài khoản của tôi</p>
            <p className="hover:underline cursor-pointer">
              Đổi, trả hàng và hoàn tiền
            </p>
            <p className="hover:underline cursor-pointer">
              Chính sách bảo mật thông tin
            </p>
            <p className="hover:underline cursor-pointer">
              Chính sách vận chuyển, giao hàng
            </p>
            <p className="hover:underline cursor-pointer">
              Giới thiệu về chúng tôi
            </p>
            <p className="hover:underline cursor-pointer">
              Đóng góp ý tưởng - ý kiến
            </p>
          </div>

          <div className="flex gap-6 text-[13px] mb-5 mt-10">
            <p className="hover:underline cursor-pointer">Facebook</p>
            <p className="hover:underline cursor-pointer">Tiktok</p>
            <p className="hover:underline cursor-pointer">Threads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
