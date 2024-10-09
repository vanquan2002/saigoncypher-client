import React from "react";
import { TbNorthStar } from "react-icons/tb";

const Banner = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-24">
      <TbNorthStar className="text-3xl md:text-6xl lg:text-8xl" />
      <h1 className="flex flex-col items-center font-black text-3xl md:text-6xl lg:text-8xl uppercase">
        Saigoncypher
        <span className="text-base font-medium">
          Đơn giản nhưng chẳng đơn điệu
        </span>
        <span className="text-base font-medium">
          Định hình phong cách riêng
        </span>
      </h1>
      <TbNorthStar className="text-3xl md:text-6xl lg:text-8xl" />
    </div>
  );
};

export default Banner;
