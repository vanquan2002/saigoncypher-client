import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/UserActions";
import { RiSearchLine } from "react-icons/ri";
import { Badge } from "antd";
import { MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Dropdown } from "antd";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandle = () => {
    dispatch(logout());
  };
  const [keyword, setKeyword] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputRef = useRef(null);

  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
    setIsOpenSearch(false);
    setKeyword("");
  };

  const navigateHandle = () => {
    if (isOpenSearch) {
      setIsOpenSearch(false);
    }
    navigate("/");
  };
  const darkModeHandle = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const items = userInfo
    ? [
        browserWidth <= 768 && {
          key: "6",
          label: (
            <p className="w-24 truncate">{userInfo && "Hi " + userInfo.name}</p>
          ),
        },
        {
          key: "1",
          label: <p onClick={() => navigate("/profile")}>Profile</p>,
        },
        {
          key: "2",
          label: <p onClick={logoutHandle}>Logout</p>,
        },
        {
          key: "8",
          label: (
            <p onClick={() => darkModeHandle()}>
              Chế độ {isDarkMode ? "sáng" : "tối"}
            </p>
          ),
        },
      ]
    : [
        {
          key: "7",
          label: <p>{!userInfo && "Chưa đăng nhập"}</p>,
        },
        {
          key: "3",
          label: <p onClick={() => navigate("/login")}>Login</p>,
        },
        {
          key: "4",
          label: <p onClick={() => navigate("/register")}>Register</p>,
        },
        {
          key: "5",
          label: (
            <p onClick={() => darkModeHandle()}>
              Chế độ {isDarkMode ? "sáng" : "tối"}
            </p>
          ),
        },
      ];

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    inputRef.current.focus();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpenSearch]);

  return (
    <div className={`sticky top-0 ${isDarkMode && "dark"}`}>
      <div className="flex justify-between items-center md:min-h-20 min-h-16 md:px-10 px-5 sticky top-0 dark:bg-primary bg-white">
        <div className="flex items-center">
          <p
            className="md:text-5xl md:font-extrabold dark:text-white text-primary font-bold text-3xl cursor-pointer"
            onClick={() => navigateHandle()}
          >
            VERSTEHE
          </p>
        </div>
        <div className="flex justify-between items-center md:gap-6 gap-4">
          <RiSearchLine
            onClick={() => setIsOpenSearch(!isOpenSearch)}
            size="1.5rem"
            className="cursor-pointer dark:text-white"
          />
          <Badge count={cartItems.length}>
            <MdOutlineShoppingBag
              onClick={() => navigate("/cart")}
              size="1.5rem"
              className="cursor-pointer dark:text-white"
            />
          </Badge>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            trigger={["click"]}
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            <div className="dark:text-white cursor-pointer flex items-center">
              <p className="hidden md:block w-24 truncate text-sm">
                {userInfo ? "Hi " + userInfo.name : "Chưa đăng nhập"}
              </p>
              <BsChevronCompactDown
                size="1.1rem"
                className={`hidden md:block ${
                  isOpenDropdown && "transform rotate-180"
                }`}
              />
              <FaRegCircleUser size="1.4rem" className="md:hidden" />
            </div>
          </Dropdown>
        </div>

        {/* NAV SEARCH */}
        <div
          onClick={() => setIsOpenSearch(false)}
          className={`fixed top-0 left-0 right-0 h-screen w-screen dark:bg-white dark:bg-opacity-10 bg-primary bg-opacity-35 transition-opacity duration-300 ${
            isOpenSearch
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`grid grid-cols-2 md:grid-cols-4 min-h-20 px-10 h-20 pt-6 pb-40 dark:bg-primary bg-white`}
          >
            <div className="md:flex items-center grid-cols-1 hidden">
              <p
                className="text-5xl dark:text-white text-primary font-extrabold cursor-pointer"
                onClick={navigateHandle}
              >
                VERSTEHE
              </p>
            </div>
            <div className="md:block grid-cols-1 hidden"></div>
            <form
              className="flex items-center justify-start md:justify-center col-span-1"
              onSubmit={submitHandle}
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border-2 w-80 rounded-full px-4 py-2 pl-14 placeholder:text-[0.85rem] outline-none"
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={keyword}
                />
                <RiSearchLine
                  onClick={submitHandle}
                  size="1.3rem"
                  className="absolute top-1/2 left-5 cursor-pointer transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </form>

            <div className="flex items-center justify-end grid-cols-1">
              <MdClose
                onClick={() => setIsOpenSearch(!isOpenSearch)}
                size="1.7rem"
                className="dark:text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
