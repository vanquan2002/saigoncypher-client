import React from "react";
import { TbNorthStar } from "react-icons/tb";

const Banner = () => {
  // Đơn giản nhưng chẳng đơn điệu.
  // Định hình phong cách riêng.
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-20">
      <TbNorthStar className="text-6xl md:hidden" />
      <h1 className="flex flex-col gap-3">
        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[11vw] leading-none text-left font-black flex items-center justify-start">
          Saig
          <TbNorthStar className="hidden md:block" />
          <span className="block md:hidden">o</span>n
        </span>

        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[11vw] leading-none text-center font-black">
          Cypher
        </span>

        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[11vw] leading-none text-right font-black flex items-center justify-end">
          St
          <TbNorthStar className="hidden md:block" />
          <span className="block md:hidden">o</span>
          re
        </span>
      </h1>
      <TbNorthStar className="text-6xl md:hidden" />
    </div>
  );
};

export default Banner;
