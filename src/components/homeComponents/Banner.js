import React from "react";
import { TbNorthStar } from "react-icons/tb";

const Banner = () => {
  // Đơn giản nhưng chẳng đơn điệu.
  // Định hình phong cách riêng.
  return (
    <div className="pt-56 pb-36 md:pt-60 md:pb-48 lg:h-screen flex flex-col items-center justify-center">
      <h1 className="flex flex-col gap-3">
        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[10vw] leading-none text-left font-black flex items-center justify-start">
          Saig
          <TbNorthStar />n
        </span>

        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[10vw] leading-none text-center font-black">
          Cypher
        </span>

        <span className="tracking-wider text-[18vw] md:text-[17vw] lg:text-[10vw] leading-none text-right font-black flex items-center justify-end">
          St
          <TbNorthStar />
          re
        </span>
      </h1>
    </div>
  );
};

export default Banner;
