import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { logout } from "./../../redux/actions/UserActions";
import ShippingTab from "./ShippingTab";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import { AppContext } from "../../AppContext";
import UpAvatarModal from "../modals/UpAvatarModal";
import MessageModal from "../modals/MessageModal";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/UserConstants";
import SmallModal from "../modals/SmallModal";

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
  const {
    numberTabNumber,
    toggleNumberTabNumber,
    isUpAvatarModal,
    toggleIsUpAvatarModal,
    toggleIsMassage,
    toggleIsSmallModal,
  } = useContext(AppContext);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { successType, error } = userUpdate;
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [errSelect, setErrSelect] = useState(null);

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    const maxSize = 10485760;
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrSelect("Vui lòng chọn tệp hình ảnh hợp lệ!");
        return;
      }
      if (file.size > maxSize) {
        setErrSelect("Kích thước tệp quá lớn (tối đa 10MB).");
        return;
      }
      if (image) {
        setImage(null);
      }
      setImage(URL.createObjectURL(file));
      setImageUrl(file);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (successType) {
      if (successType === 1) {
        toggleIsSmallModal("Cập nhật thông tin cá nhân thành công!");
        setTypeModal("update_info");
      }
      if (successType === 2) {
        toggleIsSmallModal("Cập nhật địa chỉ đặt hàng thành công!");
        setTypeModal("update_shipping");
      }
      if (successType === 3) {
        if (isUpAvatarModal) {
          toggleIsUpAvatarModal(false);
        }
        toggleIsSmallModal("Cập nhật ảnh đại diện thành công!");
        setTypeModal("update_avatar");
      }
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [successType]);

  useEffect(() => {
    if (image) {
      toggleIsUpAvatarModal(true);
    }
  }, [image]);

  useEffect(() => {
    if (error) {
      toggleIsMassage(error);
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }
  }, [error]);

  useEffect(() => {
    if (errSelect) {
      toggleIsMassage(errSelect);
      setErrSelect("");
    }
  }, [errSelect]);

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
          <form aria-label="Form tải ảnh lên" className="relative">
            <label
              className="h-20 w-20 md:h-32 md:w-32 rounded-full overflow-hidden flex justify-center items-center bg-gray-100"
              htmlFor="file_input"
              title="Chọn ảnh đại diện"
            >
              {userInfo.avatar ? (
                <img
                  className="object-cover h-full w-full"
                  src={userInfo.avatar}
                  alt={`Ảnh đại diện của ${userInfo.name}`}
                />
              ) : (
                <FaUser className="text-2xl md:text-4xl text-gray-400" />
              )}

              <div className="absolute overflow-hidden bottom-0 right-1 md:right-3 h-5 md:h-7 w-5 md:w-7 flex items-center justify-center bg-black rounded-full border-2 md:border-[3px] border-white">
                {userInfo.avatar ? (
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
                className="underline text-sm lowercase"
              >
                Đăng xuất
              </button>
            </div>

            <div className="mt-1.5">
              <h1 className="text-2xl md:text-3xl font-semibold line-clamp-1">
                {userInfo.name}
              </h1>
              <span className="text-sm line-clamp-1 font-light">
                {userInfo.email}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <ul className="grid grid-cols-3">
            {nameTabs.map((item, i) => (
              <li key={i} className="col-span-1">
                <button
                  aria-label="Chỉnh sửa thông tin cá nhân"
                  type="button"
                  onClick={() => toggleNumberTabNumber(i + 1)}
                  className={`w-full text-center py-2 border-b ${
                    numberTabNumber === i + 1
                      ? "border-black text-black font-medium"
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

      <UpAvatarModal
        image={image}
        imageUrl={imageUrl}
        altImage={userInfo.name}
      />
      <SmallModal result={typeModal === "update_info"} type="" />
      <SmallModal result={typeModal === "update_shipping"} type="" />
      <SmallModal result={typeModal === "update_avatar"} type="" />
      <MessageModal type="" />
    </main>
  );
};

export default Contents;
