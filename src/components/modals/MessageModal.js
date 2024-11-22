import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

const MessageModal = ({ type }) => {
  const { isMassage, toggleIsMassage } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateShippingHandle = () => {
    toggleIsMassage("");
    navigate("/shipping");
  };

  useEffect(() => {
    document.body.style.overflow = isMassage ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMassage]);

  return (
    <div
      onClick={() => toggleIsMassage("")}
      className={`z-20 ${
        isMassage
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-gray-300 w-64 md:w-72"
      >
        <div className="flex flex-col gap-1 justify-center w-full min-h-1 p-3 md:p-4 border-b border-gray-300">
          <span className="lowercase text-lg font-medium">Thông báo.</span>
          <span className="lowercase text-[15px]">
            {isMassage}
            {type === "shipping" && (
              <button
                type="button"
                aria-label="Đi đến trang nhập thông tin đặt hàng"
                onClick={() => navigateShippingHandle()}
                className="lowercase ml-2 text-[15px] underline"
              >
                Nhập
              </button>
            )}
          </span>
        </div>
        <button
          onClick={() => toggleIsMassage("")}
          className="flex justify-center items-center w-full min-h-1 py-2 text-center hover:bg-gray-100"
        >
          <span className="lowercase text-[15px]">Đóng.</span>
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
