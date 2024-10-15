import React from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import Header from "../components/headerComponents/Header";
import { Helmet } from "react-helmet";
import Banner from "../components/homeComponents/Banner";

export default function HomeScreen() {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | T-Shirt Store VietNam</title>
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
    </div>
  );
}
