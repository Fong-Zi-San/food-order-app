import {createContext, useReducer} from "react";
import {initialItemsState, itemsReducer} from "../reducer/itemsReducer";
import {v4 as uuidv4} from "uuid";
import api from "../../api/items";

export const itemsContext = createContext({});

export function ItemsContextProvider({children}) {
  const [itemsState, dispatch] = useReducer(itemsReducer, initialItemsState);

  const ACTION_TYPE = {
    SWITCHED_PAGE: "SWITCHED_PAGE",
    TOGGLED_FORM: "TOGGLED_FORM",
    ITEM_ADDED: "ITEM_ADDED",
    ITEMS_RETRIEVED: "ITEMS_RETRIEVED",
    ITEM_DELETED: "ITEM_DELETED",
  };

  // Toggle between User or Admin page
  const togglePage = () => {
    dispatch({type: ACTION_TYPE.SWITCHED_PAGE});
  };

  // Toggle AddItemForm
  const toggleForm = () => {
    dispatch({type: ACTION_TYPE.TOGGLED_FORM});
  };

  // Add item to menu
  const addItemHandler = async (item) => {
    const request = {
      id: uuidv4(),
      ...item,
    };
    const response = await api.post("/items", request);
    dispatch({type: ACTION_TYPE.ITEM_ADDED, payload: response.data});
  };

  // Retrieve menu items
  const retrieveItems = async () => {
    const response = await api.get("/items");
    if (response.data)
      dispatch({type: ACTION_TYPE.ITEMS_RETRIEVED, payload: response.data});
  };

  // Delete menu item
  const deleteItemHandler = async (id) => {
    await api.delete(`/items/${id}`);
    dispatch({type: ACTION_TYPE.ITEM_DELETED, payload: id});
  };

  const value = {
    itemsState,
    togglePage,
    toggleForm,
    addItemHandler,
    retrieveItems,
    deleteItemHandler,
  };

  return (
    <itemsContext.Provider value={value}>{children}</itemsContext.Provider>
  );
}
