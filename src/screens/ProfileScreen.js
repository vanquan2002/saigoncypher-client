import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Contents from "../components/profileComponents/Contents";
import Header from "../components/headerComponents/Header";
import Footer from "../components/footerComponents/Footer";

const ProfileScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Helmet>
        <title>SaigonCypher | {userInfo.name}</title>
      </Helmet>

      <Header isTypeCol={0} />
      <Contents />
      <Footer type="" />
    </div>
  );
};

export default ProfileScreen;
