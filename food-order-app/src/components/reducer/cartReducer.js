export const initialCartState = {
  showModal: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  checkoutSuccessful: false,
};

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "TOGGLED_MODAL":
      return {
        ...cartState,
        showModal: !cartState.showModal,
        checkoutSuccessful: false,
      };
    case "ADDED_ITEM":
      return {
        ...cartState,
        cartItems: [...cartState.cartItems, action.payload],
        totalQuantity: cartState.totalQuantity + 1,
        totalPrice: cartState.totalPrice + action.payload.price,
      };
    case "REMOVED_ITEM":
      const removedItem = cartState.cartItems.find(
        (item) => item.id === action.payload
      );
      if (removedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.filter(
            (item) => item.id !== action.payload
          ),
          totalQuantity: cartState.totalQuantity - removedItem.quantity,
          totalPrice:
            cartState.totalPrice - removedItem.price * removedItem.quantity,
        };
      } else {
        return cartState;
      }
    case "INCREASED_QUANTITY":
      const increasedItem = cartState.cartItems.find(
        (item) => item.id === action.payload
      );
      if (increasedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.map((item) =>
            item.id === action.payload
              ? {...item, quantity: item.quantity + 1}
              : item
          ),
          totalQuantity: cartState.totalQuantity + 1,
          totalPrice: cartState.totalPrice + increasedItem.price,
        };
      } else {
        return cartState;
      }
    case "DECREASED_QUANTITY":
      const decreasedItem = cartState.cartItems.find(
        (item) => item.id === action.payload
      );
      if (decreasedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.map((item) =>
            item.id === action.payload
              ? {...item, quantity: item.quantity - 1}
              : item
          ),
          totalQuantity: cartState.totalQuantity - 1,
          totalPrice: cartState.totalPrice - decreasedItem.price,
        };
      } else {
        return cartState;
      }
    case "CLEARED_CART":
      return {...cartState, cartItems: [], totalQuantity: 0, totalPrice: 0};
    case "CHECKED_OUT":
      return {
        ...cartState,
        cartItems: [],
        totalQuantity: 0,
        totalPrice: 0,
        checkoutSuccessful: true,
      };
    default:
      return cartState;
  }
};
