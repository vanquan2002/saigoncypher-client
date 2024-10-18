import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";

const AddCartSuccessModal = () => {
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  return (
    <div
      className={`z-20 fixed -translate-x-1/2 md:-translate-x-0 bottom-1/2 left-1/2 md:bottom-8 md:left-8 ${
        isSmallModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300`}
    >
      <div className="bg-black flex items-center gap-4 px-4 py-[11px]">
        <span className="text-white text-center text-sm lowercase">
          Thêm sản phẩm vào giỏ hàng thành công!
        </span>
        <button
          onClick={() => toggleIsSmallModal("")}
          type="button"
          aria-label="Đóng thông báo đã thêm sản phẩm vào giỏ hàng thành công"
          className="hidden md:block"
        >
          <MdClose className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default AddCartSuccessModal;
