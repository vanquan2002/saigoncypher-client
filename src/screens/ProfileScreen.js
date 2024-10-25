import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Contents from "../components/profileComponents/Contents";
import Footer from "../components/Footer";
import Header from "./../components/headerComponents/Header";

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
      <Footer />
    </div>
  );
};

export default ProfileScreen;
