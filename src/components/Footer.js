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
      name: "Đổi, trả hàng và hoàn tiền",
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
      className={`${
        lastSegment === "cart"
          ? "mb-[7.7rem]"
          : lastSegment === "detail"
          ? "mb-14"
          : ""
      } md:mb-0`}
    >
      <div className="px-5 md:px-20 mt-72 flex flex-col gap-20 md:gap-32">
        <div className="flex justify-center gap-5 md:gap-8">
          {socials.map((item, i) => (
            <a
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              aria-label={`Đi đến trang ${item.name}`}
              className="lowercase hover:underline cursor-pointer flex items-center"
            >
              {item.name}.
            </a>
          ))}
        </div>

        <div className="flex gap-1 flex-col items-center">
          <div>
            <span className="lowercase">Phone:</span>
            <a
              aria-label="Truy cập số điện thoại của SaigonCypher: 0905260554"
              href="tel:0905260554"
              className="hover:underline cursor-pointer ml-1"
            >
              0905260554
            </a>
          </div>
          <div>
            <span className="lowercase">Email:</span>
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
              className="lowercase hover:underline cursor-pointer flex items-center"
            >
              {item.name}.
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-2 mt-16 bg-gray-100">
        <span className="text-sm">@2024.</span>
        <span className="text-sm">Thiết kế web bởi Quân đẹp trai</span>
      </div>
    </footer>
  );
};

export default Footer;
