import React from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import Header from "../components/headerComponents/Header";
import { Helmet } from "react-helmet";
import Banner from "../components/homeComponents/Banner";

export default function HomeScreen() {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | T-Shirt Store VietNam</title>
      </Helmet>

      <Header isTypeCol={1} />
      <Banner />
      <Contents />
      <Footer />
    </div>
  );
}
