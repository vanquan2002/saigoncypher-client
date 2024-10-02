import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "./../redux/actions/CartActions";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    navigate("/payment");
  };

  return (
    <div>
      <Header />
      <p>DELIVERY ADDRESS</p>
      <form
        onSubmit={submitHandle}
        className="flex flex-col w-1/4 border-2 border-indigo-600 m-2 p-2"
      >
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Enter address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Enter city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Enter postal code"
          required
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Enter country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button>CONTINUE</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
