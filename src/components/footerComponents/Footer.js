import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import Marquees from "../Marquees";
import { BiLogoMessenger } from "react-icons/bi";
import { BiSolidChevronUp } from "react-icons/bi";

const Footer = ({ type }) => {
  const bottomClass =
    type === "detail_product" ? "bottom-20 md:bottom-5" : "bottom-5";
  const [showScrollTop, setShowScrollTop] = useState(false);
  const socialsFollow = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      name: "Tiktok",
      link: "tiktok.com",
    },
    {
      name: "Instagram",
      link: "instagram.com",
    },
    {
      name: "Threads",
      link: "threads.com",
    },
  ];
  const companyInformation = [
    {
      name: "Giới thiệu về chúng tôi",
      link: "/aboutus",
    },

    {
      name: "Đóng góp ý kiến",
      link: "/",
    },
  ];
  const termsAndPolicies = [
    {
      name: "Điều khoản dịch vụ",
      link: "/termsofservice",
    },
    {
      name: "Chính sách bảo mật",
      link: "/",
    },
    {
      name: "Chính sách đổi trả hàng",
      link: "/",
    },
    {
      name: "Chính sách vận chuyển",
      link: "/",
    },
  ];

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`mt-72 ${
        type === "detail_product"
          ? "mb-14 md:mb-0"
          : ["cart", "shipping", "place_order"].includes(type)
          ? "mb-[4.4rem]"
          : "md:mb-0"
      }`}
      aria-label="Chân trang của SaigonCypher"
    >
      <Marquees />

      <div className="my-10 md:my-20 flex justify-between flex-wrap gap-10 px-5 md:px-20">
        <div className="flex flex-col">
          <span className="font-medium">Thông tin về công ty:</span>
          <nav aria-label="Liên kết mạng xã hội" className="mt-2">
            <ul className="flex flex-col items-start gap-0.5">
              {companyInformation.map((item, i) => (
                <li key={i}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link}
                    aria-label={`Đi đến trang ${item.name}`}
                    className="lowercase text-[15px] hover:underline cursor-pointer flex items-center font-light"
                  >
                    {item.name}
                    <MdArrowOutward />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Chính sách và điều khoản:</span>
          <nav aria-label="Liên kết khác" className="mt-2">
            <ul className="flex flex-col items-start gap-0.5">
              {termsAndPolicies.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    target="_blank"
                    aria-label={`Đi đến trang ${item.name}`}
                    className="lowercase text-[15px] hover:underline cursor-pointer flex items-center font-light"
                  >
                    {item.name}
                    <MdArrowOutward />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Theo dõi chúng tôi:</span>
          <nav aria-label="Liên kết mạng xã hội" className="mt-2">
            <ul className="flex flex-col items-start gap-0.5">
              {socialsFollow.map((item, i) => (
                <li key={i}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link}
                    aria-label={`Đi đến trang ${item.name}`}
                    className="lowercase text-[15px] hover:underline cursor-pointer flex items-center font-light"
                  >
                    {item.name}
                    <MdArrowOutward />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-2">
        <span className="text-sm font-bold text-gray-400">@2024</span>
        <span className="text-sm font-bold text-gray-400">-</span>
        <span className="text-sm font-bold text-gray-400">SAIGONCYPHER</span>
      </div>
      <nav
        aria-label="Liên kết mạng xã hội"
        className={`z-10 fixed right-3 md:right-5 ${bottomClass}`}
      >
        <ul className="flex flex-col gap-1.5">
          <li className="flex items-center justify-center h-12 w-12 backdrop-blur-sm bg-white/30 rounded-full">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/"
              aria-label="Kết nối messenger"
              className=""
            >
              <BiLogoMessenger className="text-5xl" />
            </a>
          </li>
          <li
            className={`flex items-center justify-center h-12 w-12 backdrop-blur-sm bg-white/30 rounded-full ${
              showScrollTop
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5 pointer-events-none"
            } duration-300`}
          >
            <button
              type="button"
              aria-label="Lên đầu trang"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border border-neutral-300 black rounded-full"
            >
              <BiSolidChevronUp className="text-4xl" />
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
