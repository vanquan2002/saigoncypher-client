import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import Header from "../components/headerComponents/Header";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import { AppContext } from "../AppContext";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import { Helmet } from "react-helmet";
import Banner from "../components/homeComponents/Banner";

export default function HomeScreen() {
  const { isBarRight, toggleIsBarRight } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isBarRight ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBarRight]);

  return (
    <div>
      <Helmet>
        <title>SAIGONCYPHER | STORE T-SHIRT VIETNAM</title>
        <meta
          name="description"
          content="Cửa hàng trực tuyến Saigoncypher, mang phong cách đơn giản mà hiện đại. Chúng tôi cung cấp các mẫu áo chất lượng, thiết kế tinh tế, phù hợp với mọi dịp. Cùng chúng tôi tạo nên phong cách riêng biệt của bạn!"
        />
        <meta
          name="keywords"
          content="áo thun, áo thun nam, áo thun nữ, áo thun thời trang, thời trang sài gòn, t-shirt, saigon, cypher, saigoncypher"
        />
      </Helmet>

      <Header />
      <Banner />
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
