import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { BiLogoMessenger } from "react-icons/bi";
import { BiSolidChevronUp } from "react-icons/bi";
import { RiMailOpenLine } from "react-icons/ri";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdClose } from "react-icons/md";

const Footer = ({ type }) => {
  const bottomClass =
    type === "detail_product"
      ? "bottom-20 md:bottom-5"
      : ["cart", "shipping", "place_order"].includes(type)
      ? "bottom-24"
      : "bottom-5";
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const inputRef = useRef(null);

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
  const removeKeySearchHandle = () => {
    setEmailNewsletter("");
    inputRef.current?.focus();
  };

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };
  const submitEmailNewsletterHandle = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-neutral-200 mt-20 ${
        type === "detail_product"
          ? "mb-14 md:mb-0"
          : ["cart", "shipping", "place_order"].includes(type)
          ? "mb-[4.4rem]"
          : "md:mb-0"
      }`}
      aria-label="Chân trang của SaigonCypher"
    >
      <div className="flex justify-between flex-wrap gap-10 py-14 md:py-20 px-5 md:px-20">
        <section className="flex flex-col">
          <h3 className="font-medium">Thông tin về công ty:</h3>
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
        </section>

        <section className="flex flex-col">
          <h3 className="font-medium">Chính sách và điều khoản:</h3>
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
        </section>

        <section className="flex flex-col">
          <h3 className="font-medium">Theo dõi chúng tôi:</h3>
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
        </section>

        <section className="flex flex-col">
          <h3 className="font-medium">Chăm sóc khách hàng:</h3>
          <nav aria-label="Liên kết mạng xã hội" className="mt-2">
            <ul className="flex flex-col items-start gap-0.5">
              <li>
                <a
                  aria-label="Gọi số điện thoại 0905260554"
                  href="tel:0905260554"
                  className="lowercase text-[15px] hover:underline cursor-pointer ml-1 font-light flex items-center gap-2"
                >
                  <MdOutlinePhoneInTalk className="text-lg" /> 0905260554
                </a>
              </li>
              <li>
                <a
                  aria-label="Gửi email đến saigoncyphersupport@gmail.com"
                  href="mailto:saigoncyphersupport@gmail.com"
                  className="lowercase text-[15px] hover:underline cursor-pointer ml-1 font-light flex items-center gap-2"
                >
                  <RiMailOpenLine className="text-lg" />
                  saigoncyphersupport@gmail.com
                </a>
              </li>
              <li>
                <p className="ml-1.5 mt-0.5 text-[13px] text-neutral-400 font-light">
                  Hoạt động từ thứ 2 - thứ 7, 8am - 10pm
                </p>
              </li>
            </ul>
          </nav>
        </section>

        <section
          className="flex flex-col mb-8 md:mb-0"
          aria-labelledby="newsletter-section-title"
        >
          <h3 className="font-medium">Đăng kí nhận bản tin:</h3>
          <form
            aria-label="Biểu mẫu đăng ký nhận bản tin"
            className="mt-3 pl-3.5 py-1.5 w-full flex items-center border border-black"
            onSubmit={submitEmailNewsletterHandle}
          >
            <input
              autoComplete="off"
              onChange={(e) => setEmailNewsletter(e.target.value)}
              className="w-full outline-none text-[15px] bg-transparent"
              type="email"
              placeholder="infor@gmail.com"
              aria-label="Nhập email của bạn"
              value={emailNewsletter}
              ref={inputRef}
            />
            <div className="flex items-center">
              {emailNewsletter && (
                <button
                  type="button"
                  onClick={() => removeKeySearchHandle()}
                  aria-label="Xóa nội dung tìm kiếm"
                  className="px-1.5"
                >
                  <MdClose className="text-lg" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Gửi email đăng ký nhận bản tin"
                className="lowercase text-nowrap px-5 hover:underline border-l border-black text-[15px]"
              >
                Gửi
              </button>
            </div>
          </form>
          <p className="text-[13px] text-neutral-600 mt-2 lowercase">
            Nhận thông tin khuyến mãi và các cập nhật mới nhất qua email.
          </p>
        </section>
      </div>

      <div className="flex justify-center gap-2 py-2 border-t border-neutral-300">
        <span className="text-xs font-medium text-neutral-400 uppercase">
          Copyright @2024 Saigoncypher - Viet Nam.
        </span>
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
