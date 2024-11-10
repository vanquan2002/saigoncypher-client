import React, { useEffect, useState } from "react";

const ProductListSkeleton = ({ numberColList }) => {
  const [itemCount, setItemCount] = useState(2);

  const updateItemCount = () => {
    if (window.innerWidth >= 1024) {
      setItemCount(8);
    } else if (window.innerWidth >= 768) {
      setItemCount(4);
    } else {
      setItemCount(4);
    }
  };

  useEffect(() => {
    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <div className="animate-pulse">
      <ul
        className={`grid grid-cols-${numberColList} md:grid-cols-2 lg:grid-cols-4 ${
          numberColList === 2
            ? "gap-x-[2px] gap-y-5 border-x-2 border-white"
            : "gap-5"
        } md:gap-x-4 md:gap-y-8`}
      >
        {Array.from({ length: itemCount }).map((_, index) => (
          <li key={index} aria-hidden="true" className="col-span-1">
            <div className="bg-gray-100 aspect-[2/3]"></div>
            <div
              className={`flex flex-col ${
                numberColList === 2 ? "mt-3 px-2 gap-2" : "mt-3 px-3 gap-3.5"
              } mb-1 md:mb-0 md:mt-3 md:px-0 md:gap-3`}
            >
              <div className="bg-gray-100 w-full h-3.5"></div>
              <div className="bg-gray-100 w-2/5 h-3.5"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListSkeleton;
