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
      className={`z-10 sticky top-0 left-0 flex justify-between items-center h-12 md:h-16 px-5 backdrop-blur-sm bg-whitePrimary/30`}
    >
      <Link
        to="/"
        aria-label="Tên thương hiệu của Saigonsimple. Đi đến trang chủ"
        title="Truy cập trang chủ Saigonsimple"
        className="md:text-lg uppercase font-bold cursor-pointer"
      >
        Saigonsimple
      </Link>
      <nav className="flex justify-between items-center gap-4 md:gap-5">
        {userInfo ? (
          <span className="text-sm font-medium hidden md:block">
            Hi, {userInfo.name}
          </span>
        ) : (
          <span className="text-sm font-medium hidden md:block">
            Chưa đăng nhập
          </span>
        )}
        <button
          onClick={() => toggleIsBarRight("search")}
          aria-label="Tìm kiếm"
        >
          <RiSearchLine className="text-[1.3rem]" />
        </button>
        <button
          onClick={() => toggleIsBarRight("cart")}
          className="relative"
          aria-label="Giỏ hàng"
        >
          <MdOutlineShoppingBag className="text-[1.3rem]" />
          <span className="absolute bottom-2 left-3 flex items-center justify-center min-h-[18px] min-w-[18px] bg-black rounded-full text-white text-[11px]">
            {cartItems.length}
          </span>
        </button>
        <button onClick={() => toggleIsBarRight("menu")} aria-label="Menu">
          <HiMenuAlt3 className="text-[1.3rem]" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
