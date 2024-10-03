import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import Header from "../components/headerComponents/Header";
import { AppContext } from "../AppContext";
import Contents from "../components/loginComponents/Contents";

const Login = () => {
  const { isBarRight, toggleIsBarRight } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isBarRight ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBarRight]);

  return (
    <div>
      <Header />
      <Contents />
      <Footer />

      <div
        className={`fixed z-20 top-0 left-0 h-screen w-screen bg-black bg-opacity-50 duration-300 ${
          isBarRight
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleIsBarRight("")}
      ></div>

      <CartLayout result={isBarRight === "cart"} />
      <SearchLayout result={isBarRight === "search"} />
      <MenuLayout result={isBarRight === "menu"} />
    </div>
  );
};

export default Login;
