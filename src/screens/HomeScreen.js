import React, { useContext } from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import Header from "../components/headerComponents/Header";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import { AppContext } from "../AppContext";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";

export default function HomeScreen() {
  const { isBarRight, toggleIsBarRight } = useContext(AppContext);

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
}
