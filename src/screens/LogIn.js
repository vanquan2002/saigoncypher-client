import React from "react";
import Contents from "../components/loginComponents/Contents";
import { Helmet } from "react-helmet";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>SaigonCypher | Đăng nhập</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer />
    </div>
  );
};

export default Login;
