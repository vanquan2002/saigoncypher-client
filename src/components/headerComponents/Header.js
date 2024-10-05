import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { AppContext } from "../../AppContext";

const Header = () => {
  const { toggleIsBarRight } = useContext(AppContext);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div
      className={`z-10 sticky top-0 left-0 backdrop-blur-sm bg-whitePrimary/30`}
    >
      <div className="flex justify-between items-center h-12 md:h-16 px-5 sticky top-0 ">
        <div className="flex items-center">
          <p
            className="text-base uppercase font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            saigonsimple
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 md:gap-5">
          {userInfo ? (
            <span className="text-sm font-medium uppercase hidden md:block">
              Hi, {userInfo.name}
            </span>
          ) : (
            <span className="text-sm font-medium uppercase hidden md:block">
              Chưa đăng nhập
            </span>
          )}
          <RiSearchLine
            onClick={() => toggleIsBarRight("search")}
            size="1.3rem"
            className="cursor-pointer"
          />
          <div
            onClick={() => toggleIsBarRight("cart")}
            className="cursor-pointer relative"
          >
            <MdOutlineShoppingBag size="1.3rem" />
            <div className="absolute bottom-2 left-3 flex items-center justify-center min-h-[19px] min-w-[19px] bg-black rounded-full">
              <span className="text-white text-[12px]">{cartItems.length}</span>
            </div>
          </div>
          <HiMenuAlt3
            onClick={() => toggleIsBarRight("menu")}
            size="1.3rem"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
