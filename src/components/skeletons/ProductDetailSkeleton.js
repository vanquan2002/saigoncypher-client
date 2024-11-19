import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-20">
        <div className="lg:w-2/5 h-[550px] bg-slate-100"></div>
        <div className="lg:w-3/5 px-5 md:px-0">
          <div className="flex flex-col gap-[13px]">
            <div className="h-6 bg-slate-100"></div>
            <div className="flex">
              <div className="w-1/5 h-[19px] bg-slate-100"></div>
              <div className="w-1/5 h-[19px] bg-slate-100"></div>
            </div>
          </div>
          <div className="hidden md:block mt-11">
            <div className="w-1/4 h-[18px] bg-slate-100"></div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="bg-slate-100 w-full h-10"></li>
              ))}
            </ul>
            <div className="w-2/3 h-4 bg-slate-100 mt-3"></div>
            <div className="h-12 bg-slate-100 mt-10"></div>
          </div>
          <ul className="mt-12 w-full flex flex-col border-t">
            {[1, 2, 3].map((item) => (
              <li
                key={item}
                className="border-b border-gray-100 py-3 flex justify-between"
              >
                <div className="h-4 w-1/3 bg-gray-100"></div>
                <div className="h-4 w-4 bg-gray-100"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-40">
        <div className="mx-5 md:mx-0 h-[22px] w-full md:w-2/3 lg:w-1/3 bg-slate-100"></div>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-0.5 md:gap-5 mt-6 md:mt-11">
          {[1, 2].map((item) => (
            <li key={item} className="flex gap-4 p-4 border border-gray-100">
              <div className="h-10 min-w-10 rounded-full bg-slate-100 mt-1"></div>
              <div className="w-full">
                <div className="flex justify-between items-start">
                  <div className="h-[18px] w-1/3 bg-slate-100"></div>
                  <div className="h-[14px] w-1/3 bg-slate-100"></div>
                </div>
                <div className="h-[18px] w-1/3 bg-slate-100 mt-2"></div>
                <div className="h-20 w-full bg-slate-100 mt-2"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
