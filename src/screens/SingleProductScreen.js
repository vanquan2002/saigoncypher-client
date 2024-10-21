import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "./../components/headerComponents/Header";
import Contents from "../components/singleProductComponents/Contents";
import Breadcrumbs from "../components/Breadcrumbs";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

const SingleProductScreen = () => {
  const { isCartModal, toggleIsCartModal } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isCartModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartModal]);

  return (
    <div>
      <Helmet>
        <title>Saigoncypher - Thông tin sản phẩm</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />

      <div
        className={`fixed z-20 top-0 left-0 h-screen w-screen bg-black bg-opacity-50 duration-300 ${
          isCartModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleIsCartModal(false)}
      ></div>

      <button
        onClick={() => toggleIsCartModal(true)}
        className={`md:hidden fixed z-10 left-0 bottom-0 h-14 w-screen bg-black flex justify-center items-center`}
      >
        <span className="text-white uppercase">Thêm vào giỏ</span>
      </button>
    </div>
  );
};

export default SingleProductScreen;
