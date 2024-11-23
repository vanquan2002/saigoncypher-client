import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import Marquees from "../Marquees";

const Footer = ({ type }) => {
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
      link: "/aboutus",
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
      name: "Đóng góp ý kiến",
      link: "/",
    },
  ];

  return (
    <footer
      className={`${
        type === "detail_product"
          ? "mb-14 md:mb-0"
          : ["cart", "shipping", "place_order"].includes(type)
          ? "mb-[4.4rem]"
          : "md:mb-0"
      }`}
      aria-label="Chân trang của SaigonCypher"
    >
      <div className="mt-72 mb-16 flex flex-col gap-20 md:gap-32 px-5">
        <nav
          aria-label="Liên kết mạng xã hội"
          className="flex justify-center gap-4 md:gap-8"
        >
          {socials.map((item, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              aria-label={`Đi đến trang ${item.name}`}
              className="lowercase text-[15px] hover:underline cursor-pointer flex items-center font-light"
            >
              {item.name}
              <MdArrowOutward />
            </a>
          ))}
        </nav>

        <section
          aria-label="Thông tin liên hệ"
          className="flex gap-1 flex-col items-center"
        >
          <div>
            <span className="lowercase text-[15px] font-light">
              SĐT / Zalo:
            </span>
            <a
              aria-label="Truy cập số điện thoại của SaigonCypher: 0905260554"
              href="tel:0905260554"
              className="text-[15px] hover:underline cursor-pointer ml-1 font-light"
            >
              0905260554
            </a>
          </div>
          <div>
            <span className="lowercase text-[15px] font-light">Email:</span>
            <a
              aria-label="Truy cập email của SaigonCypher: support.saigoncypher@gmail.com"
              href="mailto:saigoncyphersupport@gmail.com"
              className="text-[15px] hover:underline cursor-pointer ml-1 font-light"
            >
              saigoncyphersupport@gmail.com
            </a>
          </div>
          <span className="mt-0.5 lowercase text-[13px] font-light">
            (Hoạt động từ thứ 2 - thứ 7, 8am - 10pm)
          </span>
        </section>

        <nav
          aria-label="Liên kết khác"
          className="flex justify-center flex-wrap gap-x-3 md:gap-x-8 gap-y-1"
        >
          {others.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              target="_blank"
              aria-label={`Đi đến trang ${item.name}`}
              className="lowercase text-[15px] hover:underline cursor-pointer flex items-center font-light"
            >
              {item.name}
              <MdArrowOutward />
            </Link>
          ))}
        </nav>
      </div>
      <Marquees />
      <div className="flex justify-center gap-2 py-2">
        <span className="text-sm font-bold text-gray-400">@2024</span>
        <span className="text-sm font-bold text-gray-400">-</span>
        <span className="text-sm font-bold text-gray-400">SAIGONCYPHER</span>
      </div>
    </footer>
  );
};

export default Footer;
