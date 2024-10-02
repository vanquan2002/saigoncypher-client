import React, { useEffect } from "react";
import Header from "./../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "./../components/loadingError/Error";
import { ORDER_CREATE_RESET } from "../redux/constants/OrderConstants";
import { createOrder } from "./../redux/actions/OrderActions";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );
  const placeOrderhandle = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [success, navigate, order, dispatch]);

  return (
    <div>
      <Header />
      <div className="fle">
        <div className="flex border-2 border-indigo-600 m-2 p-2">
          <div className="border-2 border-indigo-600 m-2 p-2">
            <h4>Customer:</h4>
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>

          <div className="border-2 border-indigo-600 m-2 p-2">
            <h4>Order info:</h4>
            <p>Shipping: {shippingAddress.country}</p>
            <p>Pay method: {paymentMethod}</p>
          </div>

          <div className="border-2 border-indigo-600 m-2 p-2">
            <h4>Deliver to:</h4>
            <p>
              Address: {shippingAddress.city}, {shippingAddress.address},{" "}
              {shippingAddress.postalCode}
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3">
            {cartItems.length === 0 ? (
              <Message variant="alert-danger">Your cart is empty</Message>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex border-2 border-indigo-600 m-2 p-2"
                >
                  <img width={100} src={item.image} alt="" />
                  <p onClick={() => navigate(`/products/${item.product}`)}>
                    {item.name}
                  </p>
                  <div className="border-2 border-indigo-600 m-2 p-2">
                    <p>PRICE:</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="border-2 border-indigo-600 m-2 p-2">
                    <p>QUANTITY:</p>
                    <p>{item.qty}</p>
                  </div>
                  <div className="border-2 border-indigo-600 m-2 p-2">
                    <p>SUBTOTAL:</p>
                    <p>${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-2 border-indigo-600 m-2 p-2">
            <div>
              <p>Products: ${cart.itemsPrice}</p>
              <p>Shipping: ${cart.shippingPrice}</p>
              <p>Tax: ${cart.taxPrice}</p>
              <p>Total: ${cart.totalPrice}</p>
              <hr />
            </div>
            {cartItems.length !== 0 && (
              <button onClick={placeOrderhandle}>PLACE ORDER</button>
            )}
            {error && <Message variant="alert-danger">{error}</Message>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
