import React from "react";
import { Helmet } from "react-helmet";
import Contents from "../components/shippingComponents/Contents";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const ShippingScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Thông tin đặt hàng</title>
      </Helmet>

      <Header />
      <Contents />
      <Footer type="shipping" />
    </div>
  );
};

export default ShippingScreen;
