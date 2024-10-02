import React from "react";

const Banner = ({ positions }) => {
  return (
    <div className="">
      {positions === "top" ? (
        <div className="w-full min-h-0 flex justify-center">
          <span className="text-[6rem] md:text-[8rem] lg:text-[11rem] text-darkPrimary uppercase font-bold relative md:mt-7 py-28">
            Cypher
            <span className="absolute left-0 bottom-[55%]">Saigon</span>
            <span className="absolute right-0 top-[55%]">Store</span>
          </span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Banner;
