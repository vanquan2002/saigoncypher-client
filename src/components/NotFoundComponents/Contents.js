import React from "react";

const Contents = () => {
  return (
    <div className="mt-64 flex justify-center">
      <div className="w-1/3">
        <div className="flex items-center justify-between bg-neutral-800 rounded-t-lg">
          <span className="font-mono text-red-500">lỗi 404</span>
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-600"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
        </div>

        <div className="bg-neutral-600 p-3 text-green-500 rounded-b-lg">
          <span className="font-mono">Trang không tồn tại!</span>
        </div>
      </div>
    </div>
  );
};

export default Contents;
