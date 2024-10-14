import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      name: "Tiktok",
      link: "tiktok.com",
    },
    {
      name: "Threads",
      link: "threads.com",
    },
  ];
  const others = [
    {
      name: "Giới thiệu về chúng tôi",
      link: "/",
    },
    {
      name: "Điều khoản dịch vụ",
      link: "/",
    },
    {
      name: "Đổi, trả hàng và hoàn tiền",
      link: "/",
    },
    {
      name: "Đóng góp ý kiến",
      link: "/",
    },
  ];

  return (
    <footer>
      <div className="px-5 md:px-20 mt-72 mb-20 flex flex-col gap-20 md:gap-32">
        <div className="flex justify-center gap-5 md:gap-8">
          {socials.map((item, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              aria-label={`Đi đến trang ${item.name}`}
              className="uppercase text-sm hover:underline cursor-pointer flex items-center"
            >
              <span className="mr-[1px]">{item.name}</span>
              <MdArrowOutward className="text-[17px] text-gray-500" />
            </a>
          ))}
        </div>

        <div className="flex gap-1 flex-col items-center">
          <div>
            <span className="uppercase text-sm">Phone:</span>
            <a
              aria-label="Truy cập số điện thoại của SaigonCypher: 0905260554"
              href="tel:0905260554"
              className="hover:underline cursor-pointer ml-1 "
            >
              0905260554
            </a>
          </div>
          <div>
            <span className="uppercase text-sm">Email:</span>
            <a
              aria-label="Truy cập email của SaigonCypher: support.saigoncypher@gmail.com"
              href="mailto:saigoncyphersupport@gmail.com"
              className="hover:underline cursor-pointer ml-1"
            >
              saigoncyphersupport@gmail.com
            </a>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-x-5 md:gap-x-8 gap-y-1">
          {others.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              target="_blank"
              aria-label={`Đi đến trang ${item.name}`}
              className="uppercase text-sm hover:underline cursor-pointer flex items-center"
            >
              <span className="mr-[1px]">{item.name}</span>
              <MdArrowOutward className="text-[17px] text-gray-500" />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-black flex flex-wrap justify-center py-[6px] gap-x-2">
        <span className="text-sm text-white text-center">@2024.</span>
        <span className="text-sm text-white">Design by Pham Van Quan</span>
      </div>
    </footer>
  );
};

export default Footer;
