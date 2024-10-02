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
        (x) => x.product === newItem.product && x.size === newItem.size
      );
      const updateCartItems = (updatedIndex, updatedFields) => {
        return state.cartItems.map((item, index) =>
          index === updatedIndex ? { ...item, ...updatedFields } : item
        );
      };
      if (existingItemIndex !== -1) {
        if (!newItem.sizeUpdate) {
          return {
            ...state,
            loading: false,
            success: true,
            indexAdded: { id: newItem.product, size: newItem.size },
            cartItems: updateCartItems(existingItemIndex, {
              ...newItem,
            }),
          };
        }
        const existingSizeIndex = state.cartItems.findIndex(
          (x) => x.product === newItem.product && x.size === newItem.sizeUpdate
        );
        if (existingSizeIndex !== -1) {
          const updatedCartItems = updateCartItems(existingSizeIndex, {
            qty: Math.min(
              50,
              state.cartItems[existingSizeIndex].qty + newItem.qty
            ),
          }).filter((_, index) => index !== existingItemIndex);
          return {
            ...state,
            loading: false,
            success: true,
            indexAdded: { id: newItem.product, size: newItem.size },
            cartItems: updatedCartItems,
          };
        } else {
          return {
            ...state,
            loading: false,
            success: true,
            indexAdded: { id: newItem.product, size: newItem.size },
            cartItems: updateCartItems(existingItemIndex, {
              size:
                newItem.sizeUpdate || state.cartItems[existingItemIndex].size,
            }),
          };
        }
      } else {
        return {
          ...state,
          loading: false,
          success: true,
          indexAdded: { id: newItem.product, size: newItem.size },
          cartItems: [...state.cartItems, newItem],
        };
      }

    case CART_ADD_ITEM_RESET:
      return { ...state, success: false, indexAdded: {} };
    case CART_REMOVE_ITEM:
      return {
        ...state,
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
