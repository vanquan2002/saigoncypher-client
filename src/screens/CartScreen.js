import React from "react";
import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "./../components/cartComponents/Contents";
import { Helmet } from "react-helmet";

const CartScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Đăng nhập</title>
      </Helmet>

      <Header />
      <Contents />
      <Footer />
    </div>
  );
};

export default CartScreen;
