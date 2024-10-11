import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { AppContext } from "../../AppContext";

const Header = () => {
  const { toggleIsBarRight } = useContext(AppContext);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header
      className={`z-10 fixed top-0 left-0 w-full flex justify-between items-center h-12 md:h-16 px-5 backdrop-blur-sm bg-whitePrimary/30`}
    >
      <Link
        to="/"
        aria-label="Logo của Saigoncypher. Đi đến trang chủ"
        title="Đi đến trang chủ Saigoncypher"
      >
        <span className="md:text-lg font-bold cursor-pointer">
          SaigonCypher
        </span>
      </Link>
      <nav className="flex justify-between items-center gap-4 md:gap-5">
        <ul className="flex gap-4 md:gap-5 justify-center items-center">
          <li>
            <Link
              to={`${userInfo ? "/profile" : "/login"}`}
              aria-label={`${
                userInfo
                  ? `Xem thông tin của ${userInfo.name}`
                  : "Chưa đăng nhập. Đi đến trang đăng nhập."
              }`}
              className="text-sm font-medium uppercase hidden md:block"
            >
              {userInfo ? <>Hi, {userInfo.name}</> : <>Chưa đăng nhập</>}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleIsBarRight("search")}
              aria-label="Mở công cụ tìm kiếm"
              className="flex justify-center items-center"
            >
              <RiSearchLine className="text-[1.2rem] md:hidden" />
              <span className="text-sm font-medium uppercase hidden md:block">
                Tìm kiếm
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleIsBarRight("cart")}
              className="relative flex justify-center items-center"
              aria-label="Mở giỏ hàng"
            >
              <MdOutlineShoppingBag className="text-[1.2rem] md:hidden" />
              <span className="text-sm font-medium uppercase hidden md:block">
                Giỏ hàng {"("}
                {cartItems.length}
                {")"}
              </span>
              <span className="md:hidden absolute bottom-2 right-[-8px] flex items-center justify-center h-[16px] w-[16px] bg-black rounded-full text-white text-[12px]">
                {cartItems.length}
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleIsBarRight("menu")}
              aria-label="Mở menu"
              className="flex justify-center items-center"
            >
              <HiMenuAlt3 className="text-[1.2rem] md:hidden" />
              <span className="text-sm font-medium uppercase hidden md:block">
                Menu
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
