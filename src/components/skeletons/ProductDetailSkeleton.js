import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="mt-5 md:mt-10 flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-20">
      <div className="lg:w-2/5 h-[550px] animate-pulse bg-slate-100"></div>
      <div className="lg:w-3/5 px-5 md:px-0">
        <div className="flex flex-col gap-[13px]">
          <div className="h-6 animate-pulse bg-slate-100"></div>
          <div className="grid grid-cols-3 w-full">
            <div className="col-span-1 w-3/5 lg:w-1/3 h-[18px] animate-pulse bg-slate-100"></div>
            <div className="col-span-2 w-2/3 h-[18px] animate-pulse bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-3 w-full">
            <div className="col-span-1 w-3/5 lg:w-1/3 h-[18px] animate-pulse bg-slate-100"></div>
            <div className="col-span-2 w-2/3 h-[18px] animate-pulse bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-3 w-full">
            <div className="col-span-1 w-3/5 lg:w-1/3 h-[18px] animate-pulse bg-slate-100"></div>
            <div className="col-span-2 w-full h-24 md:h-16 animate-pulse bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-3 w-full">
            <div className="col-span-1 w-3/5 lg:w-1/3 h-[18px] animate-pulse bg-slate-100"></div>
            <div className="col-span-2 w-2/3 h-[18px] animate-pulse bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-3 w-full">
            <div className="col-span-1 w-3/5 lg:w-1/3 h-[18px] animate-pulse bg-slate-100"></div>
            <div className="col-span-2 w-2/3 h-[18px] animate-pulse bg-slate-100"></div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-slate-100 w-full h-10"></div>
            ))}
          </div>

          <div className="mt-4 w-1/3 h-4 animate-pulse bg-slate-100"></div>

          <div className="mt-10 flex justify-between items-end">
            <div className="w-1/3 h-4 animate-pulse bg-slate-100"></div>
            <div className="w-28 h-9 animate-pulse bg-slate-100"></div>
          </div>

          <div className="mt-6 h-14 animate-pulse bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
