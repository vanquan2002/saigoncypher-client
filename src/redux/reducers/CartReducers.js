import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_RESET,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./../constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
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
            qty: updatedQty > 10 ? 10 : updatedQty,
          };
          return {
            ...state,
            loading: false,
            successType: newItem.type,
            cartItems: updatedCartItems,
          };
        } else {
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
      } else {
        return {
          ...state,
          loading: false,
          successType: newItem.type,
          cartItems: [...state.cartItems, newItem],
        };
      }

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
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
