import axios from "axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./../constants/CartConstants";

export const addToCart =
  (id, qty, size, type) => async (dispatch, getState) => {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        color: data.color,
        thumbImage: data.thumbImage,
        qty,
        size,
        type,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id, size, type) => async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { id, size, type },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
