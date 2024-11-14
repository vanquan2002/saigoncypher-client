import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { RxSquare } from "react-icons/rx";
import { GrSplit } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { logout } from "./../../redux/actions/UserActions";
import { MdClose } from "react-icons/md";

const Header = ({ isTypeCol }) => {
  const { toggleNumberColList } = useContext(AppContext);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  const openDropdownHandle = () => {
    if (userInfo) {
      setIsDropdown(!isDropdown);
    } else {
      navigate(`/login`);
    }
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsDropdown(false);
    }
  };

  const logoutHandle = () => {
    dispatch(logout());
    setIsDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="z-10 fixed top-0 left-0 w-full flex flex-wrap justify-between items-center p-5 backdrop-blur-sm bg-white/30">
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
          <li className="w-28 flex justify-end relative">
            <button
              ref={buttonRef}
              type="button"
              aria-label="Mở tùy chọn"
              aria-haspopup="true"
              aria-expanded={isDropdown ? "true" : "false"}
              className="hover:underline line-clamp-1 min-w-1"
              onClick={() => openDropdownHandle()}
            >
              <FaRegUser className="text-[1.2rem] md:hidden" />
              <span className="hidden md:block lowercase">
                {userInfo ? `${userInfo.name}` : "Đăng nhập."}
              </span>
            </button>

            <ul
              ref={dropdownRef}
              className={`bg-white flex flex-col border border-black absolute top-7 right-0 py-1.5 px-3 ${
                isDropdown
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              } duration-200`}
              role="menu"
            >
              <li>
                <Link
                  to="/profile"
                  aria-label="Đi đến trang thông tin cá nhân"
                  className="hover:underline lowercase text-nowrap text-sm"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  aria-label="Đăng xuất"
                  onClick={() => logoutHandle()}
                  className="hover:underline lowercase text-sm"
                >
                  Đăng xuất.
                </button>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/cart"
              aria-label="Đi đến giỏ hàng của bạn."
              className="relative hover:underline"
            >
              <MdOutlineShoppingBag className="text-[1.4rem] md:hidden" />
              <span className="md:hidden absolute bottom-2 right-[-8px] flex items-center justify-center h-[16px] w-[16px] bg-black rounded-full text-white text-[12px]">
                {cartItems.length}
              </span>
              <span className="lowercase hidden md:block">
                Giỏ hàng({cartItems.length})
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <form
        role="search"
        title="Ô tìm kiếm sản phẩm"
        className="mt-4 md:mt-0 py-[6px] w-full md:w-[36%] lg:w-[28%] flex items-center border border-black"
        onSubmit={(e) => submitHandle(e)}
      >
        <label htmlFor="search-input" className="px-2">
          <RiSearchLine className="text-lg" />
        </label>
        <input
          id="search-input"
          autoComplete="off"
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-transparent outline-none text-[15px]"
          type="text"
          placeholder="tìm kiếm sản phẩm..."
          aria-label="Ô tìm kiếm sản phẩm"
          value={keyword}
        />
        <div className="flex items-center">
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              aria-label="Xóa nội dung tìm kiếm"
              className="px-1"
            >
              <MdClose className="text-lg" />
            </button>
          )}
          <button
            type="submit"
            aria-label={`Tìm kiếm sản phẩm với từ khóa ${keyword}`}
            className="lowercase text-nowrap px-2 hover:underline border-l border-black text-[15px]"
          >
            Tìm kiếm.
          </button>
        </div>
      </form>

      <div
        className={`${isTypeCol ? "block" : "hidden"} md:hidden w-full mt-5`}
      >
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
