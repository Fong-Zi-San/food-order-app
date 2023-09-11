import React, {useContext, Fragment} from "react";
import {createPortal} from "react-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomButton from "../customization/CustomButton";
import {Typography, Box, Stack, AppBar, Toolbar} from "@mui/material";
import {cartContext} from "../context/cartContext";
import CartModal from "./CartModal";

function Cart() {
  const {cartState, toggleModal} = useContext(cartContext);

  return (
    <Fragment>
      <AppBar
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          zIndex: 1000,
          width: "fit-content",
          right: 20,
          top: 10,
        }}
      >
        <Toolbar disableGutters sx={{justifyContent: "flex-end"}}>
          <CustomButton onClick={toggleModal}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{width: "100%"}}
            >
              <ShoppingCartIcon />
              <Box sx={{display: {xs: "none", sm: "flex"}}}>
                <Typography>Your cart</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#ebe1d9",
                  borderRadius: 100,
                  py: 0.2,
                  px: 1.2,
                }}
              >
                <Typography>{cartState.totalQuantity}</Typography>
              </Box>
            </Stack>
          </CustomButton>
        </Toolbar>
      </AppBar>
      {cartState.showModal &&
        createPortal(
          // <Grow in={cartState.showModal} mountOnEnter unmountOnExit>
          <CartModal />,
          // </Grow>
          document.getElementById("modals")
        )}
    </Fragment>

    // Alternative way without Appbar
    // <>
    //   <CustomButton
    //     onClick={toggleModal}
    //     sx={{
    //       borderRadius: 100,
    //       position: "fixed",
    //       top: 10,
    //       right: 30,
    //       height: 50,
    //       px: 3,
    //       zIndex: 1000,
    //     }}
    //   >
    //     <Stack direction="row" alignItems="center" spacing={1}>
    //       <ShoppingCartIcon />
    //       <Typography>Your cart</Typography>
    //       <Box
    //         sx={{
    //           backgroundColor: "#ebe1d9",
    //           borderRadius: 100,
    //           py: 0.3,
    //           px: 1.3,
    //         }}
    //       >
    //         <Typography>5</Typography>
    //       </Box>
    //     </Stack>
    //   </CustomButton>
    // </>
  );
}

export default Cart;
