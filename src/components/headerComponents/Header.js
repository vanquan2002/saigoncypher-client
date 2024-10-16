import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { RxDividerVertical } from "react-icons/rx";
import { RxSquare } from "react-icons/rx";
import { GrSplit } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const { toggleIsBarRight, toggleNumberColList } = useContext(AppContext);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <header
      className={`z-10 fixed top-0 left-0 w-full flex flex-wrap justify-between items-center py-4 px-5 backdrop-blur-sm bg-whitePrimary/30`}
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

      <nav className="order-none md:order-last">
        <ul className="flex justify-end items-center gap-4 md:gap-5">
          <li>
            <Link
              to={`${userInfo ? "/profile" : "/login"}`}
              aria-label={`${
                userInfo
                  ? `Xem thông tin của ${userInfo.name}`
                  : "Chưa đăng nhập. Đi đến trang đăng nhập."
              }`}
            >
              <FaRegUser className="text-[1.2rem] md:hidden" />
              <span className="lowercase hidden md:block text-nowrap line-clamp-1 md:max-w-[120px] lg:max-w-[200px]">
                {userInfo ? `${userInfo.name}.` : "Đăng nhập."}
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => toggleIsBarRight("cart")}
              className="relative flex items-center mr-2 md:mr-0"
              aria-label="Mở giỏ hàng"
            >
              <MdOutlineShoppingBag className="text-[1.3rem] md:hidden" />
              <span className="md:hidden absolute bottom-2 right-[-8px] flex items-center justify-center h-[16px] w-[16px] bg-black rounded-full text-white text-[12px]">
                {cartItems.length}
              </span>
              <span className="lowercase hidden md:block">
                Giỏ hàng({cartItems.length})
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <form
        title="Form tìm kiếm sản phẩm"
        className="mt-4 md:mt-0 py-[6px] w-full md:w-[36%] lg:w-[28%] flex items-center border border-black"
        onSubmit={(e) => submitHandle(e)}
      >
        <label aria-hidden="true" htmlFor="search-input" className="px-2">
          <RiSearchLine className="text-lg" />
        </label>
        <input
          id="search-input"
          autoComplete="off"
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-inherit outline-none placeholder:text-sm"
          type="text"
          placeholder="tìm kiếm sản phẩm..."
          aria-label="Ô tìm kiếm sản phẩm"
          value={keyword}
          name="search"
        />
        <div className="flex items-center">
          <RxDividerVertical className="text-xl text-gray-400" />
          <button
            type="submit"
            aria-label={`Tìm kiếm sản phẩm với từ khóa ${keyword}`}
            className="lowercase text-nowrap font-medium pr-2"
          >
            Tìm kiếm
          </button>
        </div>
      </form>

      <div className="md:hidden w-full mt-5">
        <ul className="flex items-center justify-end gap-5">
          <li className="flex">
            <button
              onClick={() => toggleNumberColList(1)}
              type="button"
              aria-label="Hiển thị danh sách sản phẩm theo 1 cột"
            >
              <RxSquare className="text-lg" />
            </button>
          </li>
          <li className="flex">
            <button
              onClick={() => toggleNumberColList(2)}
              type="button"
              aria-label="Hiển thị danh sách sản phẩm theo 2 cột"
            >
              <GrSplit className="text-lg" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
