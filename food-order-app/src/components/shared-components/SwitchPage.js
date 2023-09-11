import React, {Fragment, useContext} from "react";
import Admin from "../admin/Admin";
import User from "../user/User";
import {itemsContext} from "../context/itemsContext";
import {CartContextProvider} from "../context/cartContext";

function SwitchPage() {
  const {itemsState} = useContext(itemsContext);

  return (
    <Fragment>
      {itemsState.switchPage ? (
        <Admin />
      ) : (
        <CartContextProvider>
          <User />
        </CartContextProvider>
      )}
    </Fragment>
  );
}

export default SwitchPage;
