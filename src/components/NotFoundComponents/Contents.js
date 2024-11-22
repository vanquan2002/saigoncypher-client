import React from "react";
import { useNavigate } from "react-router";

const Contents = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-56 pb-40 px-5 flex justify-center">
      <div className="w-full">
        <div className="flex items-center justify-between bg-neutral-800 px-4 py-1.5">
          <span className="font-mono text-red-500">lỗi 404</span>
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-600"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
        </div>

        <div className="bg-neutral-700 px-4 pt-3 pb-8 text-green-500 flex flex-col">
          <span className="font-mono">Trang không tồn tại!</span>
          <button
            type="button"
            aria-label="Quay về trang trước"
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="font-mono text-xs text-right mt-5"
          >
            [ Quay về ]
          </button>
        </div>
      </div>
    </main>
  );
};

export default Contents;
