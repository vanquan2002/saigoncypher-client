import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
      className={`bg-white z-30 fixed top-0 right-0 duration-500 ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="w-screen md:w-[500px] h-screen flex flex-col">
        <div className="flex justify-between w-full items-center px-5 py-6">
          <p className="text-darkPrimary font-medium uppercase">Menu</p>
          <MdClose
            onClick={() => toggleIsBarRight("")}
            size="1.7rem"
            className="cursor-pointer"
          />
        </div>

        <div className="px-5 uppercase h-full flex flex-col justify-between">
          <div>
            {userInfo ? (
              <div className="mt-6 text-[13px]">
                <div className="flex justify-between items-center border-b pb-2 border-black">
                  <p className="w-2/5">Xin chào:</p>
                  <p className="w-3/5 text-right line-clamp-1">
                    {userInfo.name}
                  </p>
                </div>
                <div className="flex flex-col items-start mt-3">
                  <p
                    onClick={() => navigateHandle("profile")}
                    className="hover:underline cursor-pointer"
                  >
                    Tài khoản
                  </p>
                  <p
                    onClick={() => logoutHandle()}
                    className="hover:underline cursor-pointer"
                  >
                    Đăng xuất
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-[13px]">
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
              <p className="hover:underline cursor-pointer">
                Tài khoản của tôi
              </p>
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
    </div>
  );
};

export default MenuLayout;
