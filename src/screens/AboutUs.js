import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";
import Contents from "../components/aboutUsComponents/Contents";

const AboutUs = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Giới thiệu về chúng tôi</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="" />
    </div>
  );
};

export default AboutUs;
