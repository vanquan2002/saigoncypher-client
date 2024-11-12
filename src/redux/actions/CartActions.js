import axios from "axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
} from "./../constants/CartConstants";

export const addToCart =
  (slug, qty, size, type) => async (dispatch, getState) => {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${slug}/detail`);
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        color: data.color,
        thumbImage: data.thumbImage,
        slug: data.slug,
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
