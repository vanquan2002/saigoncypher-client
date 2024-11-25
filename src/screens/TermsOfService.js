import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";
import Contents from "../components/termsOfServiceComponents/Contents";

const TermsOfService = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Điều khoản dịch vụ</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="" />
    </div>
  );
};

export default TermsOfService;
