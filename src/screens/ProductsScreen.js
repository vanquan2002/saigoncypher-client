import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import Contents from "./../components/productsComponents/Contents";
import Breadcrumbs from "../components/Breadcrumbs";
import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../AppContext";
import { useParams } from "react-router";

const ProductsScreen = () => {
  const { isBarRight, toggleIsBarRight } = useContext(AppContext);
  const { keyword } = useParams();
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
  ];

  const updatedPages = useMemo(() => {
    if (keyword) {
      return [...namePages, { name: `${keyword}`, url: "" }];
    }
    return namePages;
  }, [keyword]);

  useEffect(() => {
    document.body.style.overflow = isBarRight ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBarRight]);

  return (
    <div>
      <Header />
      <Breadcrumbs namePages={updatedPages} />
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

export default ProductsScreen;
