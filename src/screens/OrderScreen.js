import React from "react";
import { Helmet } from "react-helmet";
import Contents from "../components/orderComponents/Contents";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

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
