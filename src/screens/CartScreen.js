import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "./../components/cartComponents/Contents";
import Breadcrumbs from "./../components/Breadcrumbs";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading } = cart;

  return (
    <div>
      <Header />
      <div className="px-5 md:px-12">
        <Breadcrumbs offBorderBottom={false} textContent="Giỏ hàng" />
        <Contents loading={loading} cartItems={cartItems} />
      </div>
      <Footer />
    </div>
  );
};

export default CartScreen;
