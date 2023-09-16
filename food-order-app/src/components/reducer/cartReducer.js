export const initialCartState = {
  showModal: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  checkoutSuccessful: false,
};

// Helper function to find item by id
const findItemById = (cartItems, itemId) => {
  return cartItems.find((item) => item.id === itemId);
};

// Helper function to update totalQuantity and totalPrice
const updateTotal = (cartItems, itemPrice, quantityChange) => {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    totalQuantity: totalQuantity + quantityChange,
    totalPrice: totalPrice + itemPrice * quantityChange,
  };
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
        ...updateTotal(cartState.cartItems, action.payload.price, 1),
      };
    case "REMOVED_ITEM":
      const removedItem = findItemById(cartState.cartItems, action.payload);
      if (removedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.filter(
            (item) => item.id !== action.payload
          ),
          ...updateTotal(
            cartState.cartItems,
            removedItem.price,
            -removedItem.quantity
          ),
        };
      } else {
        return cartState;
      }
    case "INCREASED_QUANTITY":
      const increasedItem = findItemById(cartState.cartItems, action.payload);
      if (increasedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.map((item) =>
            item.id === action.payload
              ? {...item, quantity: item.quantity + 1}
              : item
          ),
          ...updateTotal(cartState.cartItems, increasedItem.price, 1),
        };
      } else {
        return cartState;
      }
    case "DECREASED_QUANTITY":
      const decreasedItem = findItemById(cartState.cartItems, action.payload);
      if (decreasedItem) {
        return {
          ...cartState,
          cartItems: cartState.cartItems.map((item) =>
            item.id === action.payload
              ? {...item, quantity: item.quantity - 1}
              : item
          ),
          ...updateTotal(cartState.cartItems, decreasedItem.price, -1),
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
