import React from "react";
import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "../components/registerComponents/Contents";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Đăng ký tài khoản</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />
    </div>
  );
};

export default Register;
