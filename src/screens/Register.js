import React from "react";
import Contents from "../components/registerComponents/Contents";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const Register = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Đăng ký tài khoản</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="" />
    </div>
  );
};

export default Register;
