import React from "react";
import { Helmet } from "react-helmet";
import Contents from "../components/placeOrderComponents/Contents";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const PlaceOrderScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Thanh toán</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="place_order" />
    </div>
  );
};

export default PlaceOrderScreen;
