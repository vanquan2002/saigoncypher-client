import React from "react";

const ShippingTabSkeleton = () => {
  return (
    <div className="animate-pulse">
      <ul className="mt-7 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <li
            key={item}
            className="col-span-1 border-b border-neutral-100 pb-2"
          >
            <div className="bg-neutral-100 h-3 w-1/4"></div>
            <div className="bg-neutral-100 h-3.5 w-1/3 mt-2.5"></div>
          </li>
        ))}
      </ul>

      <div className="mt-7 md:mt-10 flex justify-end">
        <div className="bg-neutral-100 h-10 w-[44%] md:w-[23%] lg:w-[13%]"></div>
      </div>
    </div>
  );
};

export default ShippingTabSkeleton;
