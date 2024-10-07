import React, { useContext, useEffect } from "react";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import Footer from "../components/Footer";
import Header from "./../components/headerComponents/Header";
import Contents from "../components/singleProductComponents/Contents";
import Breadcrumbs from "../components/Breadcrumbs";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

const SingleProductScreen = () => {
  const { isBarRight, toggleIsBarRight, isCartModal, toggleIsCartModal } =
    useContext(AppContext);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Thông tin sản phẩm", url: "" },
  ];

  const resetBarRight = () => {
    if (isBarRight) {
      toggleIsBarRight("");
    }
    if (isCartModal) {
      toggleIsCartModal();
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      isBarRight || isCartModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBarRight, isCartModal]);

  return (
    <div>
      <Helmet>
        <title>Saigonsimple - Thông tin sản phẩm</title>
        <meta
          name="description"
          content="Saigonsimple - Cửa hàng áo thun thời trang với phong cách đơn giản."
        />
        <meta
          name="keywords"
          content="áo thun, thời trang, saigon, sài gòn, simple, đơn giản, saigonsimple"
        />
      </Helmet>

      <Header />
      <Breadcrumbs namePages={namePages} />
      <Contents />
      <Footer />

      <div
        className={`fixed z-20 top-0 left-0 h-screen w-screen bg-black bg-opacity-50 duration-300 ${
          isBarRight || isCartModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => resetBarRight()}
      ></div>

      <CartLayout result={isBarRight === "cart"} />
      <SearchLayout result={isBarRight === "search"} />
      <MenuLayout result={isBarRight === "menu"} />

      <button
        onClick={() => toggleIsCartModal()}
        className={`md:hidden fixed z-10 left-0 bottom-0 h-14 w-screen bg-black flex justify-center items-center`}
      >
        <span className="text-white uppercase">Thêm vào giỏ</span>
      </button>
    </div>
  );
};

export default SingleProductScreen;
