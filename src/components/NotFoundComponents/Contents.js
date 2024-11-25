import React from "react";
import { useNavigate } from "react-router";
import { IoIosSettings } from "react-icons/io";

const Contents = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-52 px-5">
      <div className="flex flex-col items-center">
        <span className="mt-4 text-9xl text-neutral-200 font-black flex">
          4<IoIosSettings className="animate-spin [animation-duration:8s]" />4
        </span>

        <p className="mt-4 text-xl text-neutral-600 font-bold">
          Hmm, không tìm thấy trang
        </p>

        <span className="mt-2 text-sm font-light text-center">
          Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link
          hoặc chưa bao giờ tồn tại.
        </span>

        <button
          type="button"
          aria-label="Quay về trang trước"
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate("/")
          }
          className="mt-10 lowercase text-sm border border-neutral-300 px-4 py-1 hover:bg-neutral-100"
        >
          Quay về
        </button>
      </div>
    </main>
  );
};

export default Contents;
