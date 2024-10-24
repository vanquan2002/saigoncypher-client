import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/Footer";
import Contents from "../components/shippingComponents/Contents";

const ShippingScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Thông tin đặt hàng</title>
      </Helmet>

      <Header />
      <Contents />
      <Footer />
    </div>
  );
};

export default ShippingScreen;
