import React, { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { useLocation } from "react-router";

const AddCartSuccessModal = () => {
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    let timeoutId;
    if (isSmallModal === "cart") {
      timeoutId = setTimeout(() => {
        toggleIsSmallModal("");
      }, 4000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSmallModal]);

  useEffect(() => {
    if (isSmallModal === "cart") {
      toggleIsSmallModal("");
    }
  }, [location]);

  return (
    <div
      className={`z-20 fixed bottom-8 left-8 bg-black flex items-center gap-4 px-4 py-[10px] ${
        isSmallModal ? "translate-x-0" : "-translate-x-[40vw]"
      } duration-300`}
    >
      <span className="text-white text-sm lowercase">
        Thêm sản phẩm vào giỏ hàng thành công!
      </span>
      <button
        onClick={() => toggleIsSmallModal("")}
        type="button"
        aria-label="Đóng thông báo đã thêm sản phẩm vào giỏ hàng thành công"
      >
        <MdClose className="text-white text-lg" />
      </button>
    </div>
  );
};

export default AddCartSuccessModal;
