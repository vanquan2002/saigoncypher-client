import React from "react";
import Contents from "./../components/cartComponents/Contents";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const CartScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Giỏ hàng</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />
    </div>
  );
};

export default CartScreen;
