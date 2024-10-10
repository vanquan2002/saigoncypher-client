import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/UserActions";
import { AppContext } from "../../AppContext";

const MenuLayout = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { isBarRight, toggleIsBarRight } = useContext(AppContext);
  const location = useLocation();
  const socials = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      name: "Tiktok",
      link: "tiktok.com",
    },
    {
      name: "Threads",
      link: "threads.com",
    },
  ];
  const others = [
    {
      name: "Giới thiệu về chúng tôi",
      link: "/",
    },
    {
      name: "Điều khoản dịch vụ",
      link: "/",
    },
    {
      name: "Chính sách bảo mật",
      link: "/",
    },
    {
      name: "Đổi, trả hàng và hoàn tiền",
      link: "/",
    },
    {
      name: "Đóng góp ý tưởng - ý kiến",
      link: "/",
    },
  ];

  const logoutHandle = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (isBarRight === "menu") {
      toggleIsBarRight("");
    }
  }, [location]);

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
            <div className="mt-6 flex flex-col items-start gap-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-sm uppercase w-2/5">Xin chào:</span>
                <span className="text-sm uppercase w-3/5 text-right line-clamp-1">
                  {userInfo.name}
                </span>
              </div>
              <div className="w-full border-t border-black"></div>
              <div className="flex flex-col gap-1 md:gap-2">
                <Link
                  to="/profile"
                  aria-label="Đi đến trang thông tin tài khoản cá nhân"
                  className="text-sm uppercase hover:underline"
                >
                  Tài khoản
                </Link>
                <button
                  onClick={() => logoutHandle()}
                  aria-label="Đăng xuất tài khoản"
                  className="text-sm uppercase hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-start gap-1 md:gap-2">
              <Link
                to="/login"
                aria-label="Đi đến trang đăng nhập tài khoản"
                className="text-sm uppercase hover:underline"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                aria-label="Đi đến trang đăng kí tài khoản"
                className="text-sm uppercase hover:underline "
              >
                Đăng kí
              </Link>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col gap-1 md:gap-2">
            {others.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                target="_blank"
                aria-label={`Đi đến trang ${item.name}`}
                className="uppercase text-sm hover:underline cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-6 md:gap-8 mb-5 mt-20">
            {socials.map((item, i) => (
              <a
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                href={`${item.link}`}
                aria-label={`Đi đến trang ${item.name}`}
                className="uppercase text-sm hover:underline cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
