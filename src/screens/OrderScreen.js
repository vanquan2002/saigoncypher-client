import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/Footer";
import Contents from "../components/orderComponents/Contents";

const OrderScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Chi tiết đơn hàng</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />
    </div>
  );
};

export default OrderScreen;
