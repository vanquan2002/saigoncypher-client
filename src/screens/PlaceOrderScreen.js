import React from "react";
import { Helmet } from "react-helmet";
import Header from "./../components/headerComponents/Header";
import Footer from "../components/Footer";
import Contents from "../components/placeOrderComponents/Contents";

const PlaceOrderScreen = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Thanh toán</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />
    </div>
  );
};

export default PlaceOrderScreen;
