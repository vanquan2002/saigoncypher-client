import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions/UserActions";
import { FaUser } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { logout } from "./../../redux/actions/UserActions";
import ShippingTab from "./ShippingTab";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import { AppContext } from "../../AppContext";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Thông tin cá nhân", url: "" },
  ];
  const nameTabs = [
    { title: "Chỉnh sửa thông tin cá nhân", sub: "thông tin" },
    { title: "Chỉnh sửa điạ chỉ đặt hàng", sub: "Địa chỉ" },
    { title: "Đơn hàng đã đặt", sub: "Đơn hàng" },
  ];
  const { numberTabNumber, toggleNumberTabNumber } = useContext(AppContext);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageUrl(file);
    }
  };

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Thông tin cá nhân.
      </h3>

      <div className="border-t border-gray-300 mt-5 md:mt-10 pt-5 md:pt-10">
        <div className="mx-5 md:mx-0 flex gap-5 md:gap-10">
          <form className="relative h-20 min-w-20 md:h-32 md:min-w-32">
            <label
              className="h-full rounded-full overflow-hidden flex justify-center items-center bg-gray-100"
              htmlFor="file_input"
              title="Chọn ảnh đại diện"
            >
              {userInfo.avatar || image ? (
                <img
                  className="object-cover h-full max-w-20 md:max-w-32"
                  src={image ? image : userInfo.avatar}
                  alt=""
                />
              ) : (
                <FaUser className="text-2xl md:text-4xl text-gray-400" />
              )}

              <div className="absolute bottom-0 right-1 md:right-3 h-5 md:h-7 w-5 md:w-7 flex items-center justify-center bg-black rounded-full border-2 md:border-[3px] border-white">
                {userInfo.avatar || image ? (
                  <BiSolidEditAlt className="text-lg md:text-2xl p-0.5 text-white" />
                ) : (
                  <RiAddLine className="text-xl md:text-3xl p-0.5 text-white" />
                )}
              </div>
            </label>
            <input
              onChange={changeImgHandle}
              hidden
              type="file"
              id="file_input"
            />
          </form>

          <div className="w-full overflow-hidden">
            <div className="flex justify-end">
              <button
                onClick={() => dispatch(logout())}
                aria-label="Đăng xuất và đi đến trang đăng nhập"
                type="button"
                className="underline text-[15px] lowercase"
              >
                Đăng xuất
              </button>
            </div>

            <div className="mt-1.5">
              <h1 className="text-2xl md:text-3xl font-semibold line-clamp-1">
                {userInfo.name}
              </h1>
              <span className="text-[13px] md:text-[15px] line-clamp-1">
                {userInfo.email}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <ul className="grid grid-cols-3 mt-5">
            {nameTabs.map((item, i) => (
              <li key={i} className="col-span-1">
                <button
                  aria-label="Chỉnh sửa thông tin cá nhân"
                  type="button"
                  onClick={() => toggleNumberTabNumber(i + 1)}
                  className={`w-full text-center py-2 border-b ${
                    numberTabNumber === i + 1
                      ? "border-black text-black"
                      : "border-gray-200 text-gray-400"
                  } duration-300`}
                >
                  <span className="lowercase text-[15px] hidden lg:block">
                    {item.title}
                  </span>
                  <span className="lowercase text-[15px] lg:hidden">
                    {item.sub}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <ProfileTab result={numberTabNumber === 1} />
          <ShippingTab result={numberTabNumber === 2} />
          <OrdersTab result={numberTabNumber === 3} />
        </div>
      </div>
    </main>
  );
};

export default Contents;
