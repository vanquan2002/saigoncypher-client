import React from "react";
import Contents from "../components/homeComponents/Contents";
import { Helmet } from "react-helmet";
import Banner from "../components/homeComponents/Banner";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

export default function HomeScreen() {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | T-Shirt Store VietNam</title>
      </Helmet>

      <Header isTypeCol={1} />
      <Banner />
      <Contents />
      <Footer type="" />
    </div>
  );
}
