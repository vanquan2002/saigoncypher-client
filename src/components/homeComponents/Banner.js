import React from "react";
import { TbNorthStar } from "react-icons/tb";

const Banner = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-24">
      <TbNorthStar className="text-6xl md:text-8xl lg:text-8xl" />
      <span className="flex flex-col items-center font-black text-4xl md:text-7xl lg:text-8xl uppercase">
        Saigoncypher
        <span className="text-xs md:text-base font-medium">
          Đơn giản nhưng chẳng đơn điệu
        </span>
        <span className="text-xs md:text-base font-medium">
          Định hình phong cách riêng
        </span>
      </span>
      <TbNorthStar className="text-6xl md:text-8xl lg:text-8xl" />
    </div>
  );
};

export default Banner;
