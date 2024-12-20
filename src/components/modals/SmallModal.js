import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";

const SmallModal = ({ result, type }) => {
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  return (
    <div
      className={`z-20 fixed -translate-x-1/2 md:-translate-x-0 bottom-1/2 left-1/2 md:bottom-8 md:left-8 ${
        result && isSmallModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-black flex items-center gap-4 px-4 py-[11px]">
        <span className="text-white text-center text-sm lowercase">
          {isSmallModal}
        </span>
        {type === "add_item_cart" && (
          <Link
            to="/cart"
            aria-label="Đi đến trang giỏ hàng"
            className="hidden md:block text-white lowercase underline text-sm"
          >
            Xem giỏ hàng
          </Link>
        )}
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

export default SmallModal;
