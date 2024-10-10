import React from "react";
import { Link } from "react-router-dom";

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
      name: "Chính sách bảo mật",
      link: "/",
    },
    {
      name: "Đổi, trả hàng và hoàn tiền",
      link: "/",
    },
    {
      name: "Đóng góp ý tưởng - ý kiến",
      link: "/",
    },
  ];

  return (
    <footer>
      <div className="px-2 md:px-20 mt-72 mb-10 md:mb-20 flex flex-col gap-40">
        <div className="flex justify-center gap-6 md:gap-8">
          {socials.map((item, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={`${item.link}`}
              aria-label={`Đi đến trang ${item.name}`}
              className="uppercase text-sm hover:underline cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex gap-2 flex-col">
          <div className="uppercase text-sm text-center">
            <span>Hotline:</span>
            <a
              aria-label="Truy cập số điện thoại của SaigonCypher: 0905260554"
              href="tel:0905260554"
              className="hover:underline cursor-pointer ml-1"
            >
              0905260554
            </a>
          </div>
          <span className="uppercase text-sm text-center">
            Online từ Thứ 2 - Chúa Nhật, Từ 7am - 8pm
          </span>
          <div className="uppercase text-sm text-center">
            <span>Email:</span>
            <a
              aria-label="Truy cập email của SaigonCypher: saigoncyphersupport@gmail.com"
              href="mailto:saigoncyphersupport@gmail.com"
              className="hover:underline cursor-pointer ml-1"
            >
              saigoncyphersupport@gmail.com
            </a>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-x-6 md:gap-x-8 gap-y-1 md:gap-y-2">
          {others.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              target="_blank"
              aria-label={`Đi đến trang ${item.name}`}
              className="uppercase text-sm hover:underline cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-black flex flex-wrap justify-center py-[6px] gap-x-2">
        <span className="text-sm text-white text-center">
          Copyright @ 2024 by SaigonCypher. All rights reserved.
        </span>
        <span className="text-sm text-white text-center">
          Design by Pham Van Quan
        </span>
      </div>
    </footer>
  );
};

export default Footer;
