export const initialItemsState = {
  switchPage: false,
  showForm: false,
  items: [],
};

export const itemsReducer = (itemsState, action) => {
  switch (action.type) {
    case "SWITCHED_PAGE": {
      return {
        ...itemsState,
        showForm: false,
        switchPage: !itemsState.switchPage,
      };
    }
    case "TOGGLED_FORM": {
      return {...itemsState, showForm: !itemsState.showForm};
    }
    case "ITEM_ADDED": {
      return {
        ...itemsState,
        items: [...itemsState.items, action.payload],
      };
    }
    case "ITEMS_RETRIEVED": {
      return {
        ...itemsState,
        items: action.payload,
      };
    }
    case "ITEM_DELETED": {
      return {
        ...itemsState,
        items: itemsState.items.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return itemsState;
  }
};
