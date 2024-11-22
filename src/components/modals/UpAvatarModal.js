import React, { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppContext } from "../../AppContext";
import { MdClose } from "react-icons/md";
import { updateAvatar } from "../../redux/actions/UserActions";
import { USER_UPDATE_AVATAR_RESET } from "../../redux/constants/UserConstants";
import debounce from "lodash.debounce";

const UpAvatarModal = ({ image, imageUrl, altImage }) => {
  const dispatch = useDispatch();
  const { isUpAvatarModal, toggleIsUpAvatarModal } = useContext(AppContext);
  const userUpdateAvatar = useSelector((state) => state.userUpdateAvatar);
  const { loading, error } = userUpdateAvatar;

  const closeModalUpImgHandle = () => {
    if (!loading) {
      toggleIsUpAvatarModal(false);
    }
    if (error) {
      dispatch({
        type: USER_UPDATE_AVATAR_RESET,
      });
    }
  };

  const debouncedUpdateProfile = useMemo(
    () =>
      debounce(() => {
        dispatch(updateAvatar(imageUrl));
      }, 200),
    [imageUrl]
  );

  useEffect(() => {
    document.body.style.overflow = isUpAvatarModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUpAvatarModal]);

  return (
    <div
      onClick={() => closeModalUpImgHandle()}
      className={`z-20 ${
        isUpAvatarModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white border border-gray-300 w-full md:w-2/3 lg:w-1/2 mx-3 md:mx-0 pt-3 pb-5 px-5"
      >
        <div className="flex items-center justify-between">
          <h4 className="lowercase text-lg font-medium">Chọn ảnh đại diện.</h4>
          <button
            type="button"
            aria-label="Đóng form đánh giá"
            onClick={() => closeModalUpImgHandle()}
            className={`${loading && "opacity-30 pointer-events-none"}`}
          >
            <MdClose className="text-2xl" />
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <img
            src={image}
            alt={`Ảnh đại diện của ${altImage}`}
            className="h-72 w-72 object-cover rounded-full"
          />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <div className="mt-7 flex gap-4">
          <button
            type="button"
            aria-label="Đóng form tải ảnh"
            onClick={() => closeModalUpImgHandle()}
            className={`lowercase w-full text-sm border border-black py-2 hover:bg-gray-100 ${
              loading && "opacity-30 pointer-events-none"
            }`}
          >
            Hủy bỏ.
          </button>
          <button
            type="button"
            aria-label="Tải ảnh lên"
            onClick={() => debouncedUpdateProfile()}
            className="lowercase w-full text-sm bg-black text-white py-2 hover:opacity-80"
          >
            {loading ? "Đang tải lên..." : "Tải lên."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpAvatarModal;
