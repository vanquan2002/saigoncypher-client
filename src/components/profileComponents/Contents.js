import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions/UserActions";
import { FaUser } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { logout } from "./../../redux/actions/UserActions";
import { GrLogout } from "react-icons/gr";
import ShippingTab from "./ShippingTab";
import EditProfileTab from "./EditProfileTab";
import OrdersTab from "./OrdersTab";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Thông tin cá nhân", url: "" },
  ];
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tabNumber, setTabNumber] = useState(1);

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageUrl(file);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(profile());
  }, []);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Thông tin cá nhân.
      </h3>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>Error</span>
      ) : (
        <div>
          <div className="border-t border-gray-300 mt-5 md:mt-10 pt-10 flex gap-10 items-center">
            <form className="relative h-32 min-w-32">
              <label
                className="h-full rounded-full overflow-hidden flex justify-center items-center bg-gray-100"
                htmlFor="file_input"
              >
                {user.avatar || image ? (
                  <img
                    className="object-cover h-32 w-32"
                    src={image ? image : user.avatar}
                    alt=""
                  />
                ) : (
                  <FaUser size="2.3rem" className="text-gray-500" />
                )}
              </label>
              <input
                onChange={changeImgHandle}
                hidden
                type="file"
                id="file_input"
              />
              {user.avatar || image ? (
                <div className="absolute bottom-0 right-4 h-7 w-7 flex items-center justify-center bg-gray-500 rounded-full">
                  <BiSolidEditAlt className="text-2xl p-0.5 text-gray-100" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-4 h-7 w-7 flex items-center justify-center bg-gray-500 rounded-full">
                  <RiAddLine className="text-3xl p-0.5 text-gray-100" />
                </div>
              )}
            </form>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <button
                  onClick={() => dispatch(logout())}
                  aria-label="Đăng xuất và đi đến trang đăng nhập"
                  type="button"
                  className="flex items-center gap-1 hover:underline"
                >
                  <span className="lowercase text-[15px]">Đăng xuất</span>
                  <GrLogout className="text-sm" />
                </button>
              </div>
              <p className="mt-1 text-[15px]">{user.email}</p>
            </div>
          </div>

          <div className="w-full mt-10">
            <ul className="grid grid-cols-3 mt-5">
              <li className="col-span-1">
                <button
                  aria-label="Chỉnh sửa thông tin cá nhân"
                  type="button"
                  onClick={() => setTabNumber(1)}
                  className={`lowercase w-full text-center py-2 ${
                    tabNumber === 1
                      ? "border-b-2 border-black text-black"
                      : "border-b-2 border-gray-200 text-gray-600"
                  } duration-300`}
                >
                  Chỉnh sửa thông tin cá nhân.
                </button>
              </li>
              <li className="text-center col-span-1">
                <button
                  aria-label="Chỉnh sửa địa chỉ đặt hàng"
                  type="button"
                  onClick={() => setTabNumber(2)}
                  className={`lowercase w-full text-center py-2 ${
                    tabNumber === 2
                      ? "border-b-2 border-black text-black"
                      : "border-b-2 border-gray-200 text-gray-600"
                  } duration-300`}
                >
                  Chỉnh sửa địa chỉ đặt hàng.
                </button>
              </li>
              <li className="text-center col-span-1">
                <button
                  aria-label="Các đơn hàng đã đặt"
                  type="button"
                  onClick={() => setTabNumber(3)}
                  className={`lowercase w-full text-center py-2 ${
                    tabNumber === 3
                      ? "border-b-2 border-black text-black"
                      : "border-b-2 border-gray-200 text-gray-600"
                  } duration-300`}
                >
                  Đơn hàng đã đặt.
                </button>
              </li>
            </ul>

            <EditProfileTab result={tabNumber === 1} />
            <ShippingTab result={tabNumber === 2} />
            <OrdersTab result={tabNumber === 3} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Contents;
