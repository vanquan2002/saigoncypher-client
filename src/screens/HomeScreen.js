import React from "react";
import Contents from "../components/homeComponents/Contents";
import { Helmet } from "react-helmet";
import Banner from "../components/homeComponents/Banner";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";
import Marquees from "../components/Marquees";
import Introduction from "../components/homeComponents/Introduction";

export default function HomeScreen() {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | T-Shirt Store VietNam</title>
      </Helmet>

      <Header isTypeCol={1} />
      <Banner />
      <Marquees />
      <Introduction />
      <Contents />
      <Footer type="" />
    </div>
  );
}
