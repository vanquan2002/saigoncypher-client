import React from "react";

const OrderTabSkeleton = () => {
  return (
    <ul className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-x-20 lg:gap-y-10">
      {[1, 2, 3, 4].map((item) => (
        <li key={item} className="col-span-1 flex border-b border-gray-100">
          <div className="w-4/5 md:w-full lg:w-4/5">
            <div className="h-20 aspect-[2/3] bg-gray-100"></div>
          </div>

          <div className="w-3/5 flex flex-col gap-3 justify-center">
            <span className="bg-gray-100 h-4 w-2/3"></span>
            <span className="bg-gray-100 h-4 w-full"></span>
          </div>

          <div className="w-3/5 flex flex-col gap-3 justify-center items-end mr-2 md:mr-0">
            <span className="bg-gray-100 h-3.5 w-2/3"></span>
            <span className="bg-gray-100 h-3.5 w-4/5"></span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderTabSkeleton;
