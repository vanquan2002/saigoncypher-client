import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_RESET,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "./../constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CART_ADD_ITEM_SUCCESS:
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product === newItem.product && item.size === newItem.size
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const existingItem = updatedCartItems[existingItemIndex];
        const updatedQty = existingItem.qty + newItem.qty;

        if (updatedQty > 0) {
          updatedCartItems[existingItemIndex] = {
            ...existingItem,
            qty: Math.min(updatedQty, 10),
          };
          return {
            ...state,
            loading: false,
            successType: newItem.type,
            cartItems: updatedCartItems,
          };
        }
        return {
          ...state,
          successType: 2,
          cartItems: updatedCartItems.filter(
            (item) =>
              item.product !== existingItem.product ||
              item.size !== existingItem.size
          ),
        };
      }
      if (newItem.qty > 0) {
        return {
          ...state,
          loading: false,
          successType: newItem.type,
          cartItems: [...state.cartItems, newItem],
        };
      }
      return state;

    case CART_ADD_ITEM_RESET:
      return { ...state, successType: 0 };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        successType: action.payload.type,
        cartItems: state.cartItems.filter(
          (item) =>
            item.product !== action.payload.id ||
            item.size !== action.payload.size
        ),
      };
    case CART_CLEAR_ITEMS:
      return { cartItems: [] };
    default:
      return state;
  }
};
