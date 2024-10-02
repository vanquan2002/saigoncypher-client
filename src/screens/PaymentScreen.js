import React, { useState } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/CartActions";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={submitHandle}
        className="border-2 border-indigo-600 m-2 p-2"
      >
        <p>SELECT PAYMENT METHOD</p>
        <input
          onChange={(e) => setPaymentMethod(e.target.value)}
          type="radio"
          value={paymentMethod}
        />
        <button type="submit">CONTINUE</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
