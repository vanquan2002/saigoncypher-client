import React from "react";
import { Link, useLocation } from "react-router-dom";

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
      name: "Chính sách đổi, trả hàng",
      link: "/",
    },
    {
      name: "Đóng góp ý kiến",
      link: "/",
    },
  ];

  const { pathname } = useLocation();
  const lastSegment = pathname.split("/").pop();

  return (
    <footer
      className={`md:px-5 ${
        lastSegment === "cart" ||
        lastSegment === "shipping" ||
        lastSegment === "placeorder"
          ? "mb-[4.5rem] md:mb-28 lg:mb-20"
          : lastSegment === "detail"
          ? "mb-14 md:mb-0"
          : "mb-0"
      }`}
    >
      <div className="border-t border-gray-300 pt-5 md:pt-10 mt-72 flex flex-col gap-20 md:gap-32">
        <div className="flex justify-center gap-5 md:gap-8">
          {socials.map((item, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              aria-label={`Đi đến trang ${item.name}`}
              className="lowercase text-[15px] hover:underline cursor-pointer flex items-center"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex gap-1 flex-col items-center">
          <div>
            <span className="lowercase text-[15px]">SĐT / Zalo:</span>
            <a
              aria-label="Truy cập số điện thoại của SaigonCypher: 0905260554"
              href="tel:0905260554"
              className="text-[15px] hover:underline cursor-pointer ml-1"
            >
              0905260554
            </a>
          </div>
          <div>
            <span className="lowercase text-[15px]">Email:</span>
            <a
              aria-label="Truy cập email của SaigonCypher: support.saigoncypher@gmail.com"
              href="mailto:saigoncyphersupport@gmail.com"
              className="text-[15px] hover:underline cursor-pointer ml-1"
            >
              saigoncyphersupport@gmail.com
            </a>
          </div>
          <span className="mt-0.5 lowercase text-[13px] text-gray-400">
            Hoạt động từ thứ 2 - thứ 7, 8am - 10pm
          </span>
        </div>

        <div className="flex justify-center flex-wrap gap-x-5 md:gap-x-8 gap-y-1">
          {others.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              target="_blank"
              aria-label={`Đi đến trang ${item.name}`}
              className="lowercase text-[15px] hover:underline cursor-pointer flex items-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-16 pb-2">
        <span className="text-sm text-gray-400">@2024</span>
        <span className="text-sm text-gray-400">-</span>
        <span className="text-sm text-gray-400">SAIGONCYPHER</span>
      </div>
    </footer>
  );
};

export default Footer;
