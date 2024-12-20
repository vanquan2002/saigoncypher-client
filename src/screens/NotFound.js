import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";
import Contents from "../components/NotFoundComponents/Contents";

const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | T-Shirt Store VietNam</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="" />
    </div>
  );
};

export default NotFound;
