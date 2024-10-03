import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

const MessageModal = ({ message }) => {
  const { isMassage, toggleIsMassage } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isMassage ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMassage]);

  return (
    <div
      onClick={() => toggleIsMassage("")}
      className={`${
        isMassage
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-black"
      >
        <div className="flex flex-col gap-2 justify-center w-72 min-h-1 p-5 border-b border-black">
          <span className="uppercase font-medium">Thông báo</span>
          <span className="uppercase text-xs">{message}</span>
        </div>
        <button
          onClick={() => toggleIsMassage("")}
          className="flex justify-center items-center w-72 min-h-1 p-[10px] text-center"
        >
          <span className="uppercase text-xs text-black hover:text-opacity-60">
            Đóng
          </span>
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
