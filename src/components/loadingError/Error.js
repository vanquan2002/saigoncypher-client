import React from "react";

const Error = ({ error }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="flex items-center justify-between bg-neutral-800 px-4 py-1.5">
          <span className="font-mono text-red-500">lỗi</span>
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-600"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
        </div>

        <div className="bg-neutral-700 px-4 pt-3 pb-8 text-green-500 flex flex-col">
          <span className="font-mono">{error}</span>
          <span className="font-mono text-xs text-right mt-5">
            --- Vui lòng liên hệ quản trị viên ---
          </span>
        </div>
      </div>
    </div>
  );
};

export default Error;
