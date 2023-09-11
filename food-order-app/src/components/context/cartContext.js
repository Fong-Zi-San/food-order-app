import {createContext, useReducer} from "react";
import {cartReducer, initialCartState} from "../reducer/cartReducer";
import {v4 as uuidv4} from "uuid";

export const cartContext = createContext({});

export const CartContextProvider = ({children}) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const ACTION_TYPES = {
    TOGGLED_MODAL: "TOGGLED_MODAL",
    ADDED_ITEM: "ADDED_ITEM",
    REMOVED_ITEM: "REMOVED_ITEM",
    INCREASED_QUANTITY: "INCREASED_QUANTITY",
    DECREASED_QUANTITY: "DECREASED_QUANTITY",
    CLEARED_CART: "CLEARED_CART",
    CHECKED_OUT: "CHECKED_OUT",
  };

  //Show or hide cart modal
  const toggleModal = () => {
    dispatch({type: ACTION_TYPES.TOGGLED_MODAL});
  };

  //Add item to cart
  const addToCartHandler = (cartItem) => {
    const existingCartItem = cartState.cartItems.find(
      (item) => item.id === cartItem.id
    );
    if (existingCartItem) {
      dispatch({type: ACTION_TYPES.INCREASED_QUANTITY, payload: cartItem.id});
    } else {
      dispatch({type: ACTION_TYPES.ADDED_ITEM, payload: cartItem});
    }
  };

  //Remove item from cart
  const removeItemHandler = (id) => {
    dispatch({type: ACTION_TYPES.REMOVED_ITEM, payload: id});
  };

  //Increase quantity of item
  const increaseQuantityHandler = (id) => {
    dispatch({type: ACTION_TYPES.INCREASED_QUANTITY, payload: id});
  };

  //Decrease quantity of item
  const decreaseQuantityHandler = (id) => {
    const existingCartItem = cartState.cartItems.find((item) => item.id === id);
    if (existingCartItem.quantity === 1) {
      dispatch({type: ACTION_TYPES.REMOVED_ITEM, payload: id});
    } else {
      dispatch({type: ACTION_TYPES.DECREASED_QUANTITY, payload: id});
    }
  };

  //Clear cart
  const clearCartHandler = () => {
    dispatch({type: ACTION_TYPES.CLEARED_CART});
  };

  //Checkout
  const checkoutHandler = ({cartState}) => {
    const {cartItems, totalPrice, totalQuantity} = cartState;
    const order = {
      orderId: uuidv4(),
      orderItems: cartItems,
      totalPrice,
      totalQuantity,
    };
    dispatch({type: ACTION_TYPES.CHECKED_OUT});
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const value = {
    cartState,
    toggleModal,
    addToCartHandler,
    removeItemHandler,
    decreaseQuantityHandler,
    increaseQuantityHandler,
    clearCartHandler,
    checkoutHandler,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
