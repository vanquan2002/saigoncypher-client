import React from "react";

const OrderDetailSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-neutral-100 h-28 md:h-[4.5rem] w-full"></div>

      <div className="flex flex-col lg:flex-row gap-x-20 gap-y-9 mt-8 md:mt-10">
        <div className="w-full">
          <div className="bg-neutral-100 h-[18px] w-1/3 mx-5 md:mx-0"></div>
          <ul className="mt-3 flex flex-col md:gap-5">
            {[1, 2].map((item, i) => (
              <li
                key={item}
                className={`grid grid-cols-3 md:grid-cols-5 border-x ${
                  i !== 0 ? "border-b md:border-y" : "border-y"
                } border-neutral-100`}
              >
                <div className="col-span-1 bg-neutral-100 aspect-[2/3]"></div>
                <div className="col-span-2 md:col-span-4 flex flex-col justify-between p-4">
                  <div className="">
                    <div className="bg-neutral-100 h-5 w-full"></div>
                    <div className="bg-neutral-100 h-[18px] w-1/2 md:w-1/3 mt-2.5"></div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="bg-neutral-100 h-4 w-1/3"></div>
                    <div className="bg-neutral-100 h-6 w-1/3"></div>
                  </div>

                  <div className="bg-neutral-100 h-9 w-full"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col gap-8 px-5 md:px-0">
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-100 h-[18px] w-1/2"></div>
            <div className="bg-neutral-100 h-[18px] w-full"></div>
            <div className="bg-neutral-100 h-[18px] w-3/5"></div>
          </div>

          <div>
            <div className="bg-neutral-100 h-5 w-1/2"></div>
            <div className="mt-2 flex justify-between">
              <div className="bg-neutral-100 h-[18px] w-1/3"></div>
              <div className="bg-neutral-100 h-[18px] w-1/5"></div>
            </div>
          </div>

          <div>
            <div className="bg-neutral-100 h-[18px] w-1/2"></div>
            <div className="bg-neutral-100 h-[18px] w-2/3 mt-2"></div>
          </div>

          <div>
            <div className="bg-neutral-100 h-[18px] w-1/4"></div>
            <div className="bg-neutral-100 h-16 w-full mt-2"></div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-neutral-100 h-[18px] w-1/3"></div>
            <div className="flex justify-between">
              <div className="bg-neutral-100 h-[18px] w-1/4"></div>
              <div className="bg-neutral-100 h-[18px] w-1/5"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-100 h-[18px] w-1/4"></div>
              <div className="bg-neutral-100 h-[18px] w-1/5"></div>
            </div>
            <div className="flex justify-between border-t border-neutral-100 mt-1 pt-[10px]">
              <div className="bg-neutral-100 h-[18px] w-1/4"></div>
              <div className="bg-neutral-100 h-[18px] w-1/5"></div>
            </div>
          </div>

          <div className="mt-3">
            <div className="bg-neutral-100 h-9 w-full"></div>
            <div className="bg-neutral-100 h-4 w-4/5 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
