import {Fragment, useContext} from "react";
import {Grid, IconButton, Stack, Typography, Box} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CustomButton from "../customization/CustomButton";
import {cartContext} from "../context/cartContext";

export default function CartModal() {
  const {
    cartState,
    toggleModal,
    decreaseQuantityHandler,
    increaseQuantityHandler,
    removeItemHandler,
    clearCartHandler,
    checkoutHandler,
  } = useContext(cartContext);

  const formattedTotalPrice = parseFloat(cartState.totalPrice).toFixed(2);

  function ModalContainer({children}) {
    return (
      <Box
        sx={{
          height: "100vh",
          zIndex: 999,
          position: "fixed",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(1px)",
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: "55%",
            minHeight: "12%",
            maxHeight: "35%",
            p: 2,
            backgroundColor: "#d7a27e",
            border: "2px solid #ebe1d9",
            borderRadius: 10,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Cart</Typography>
            <IconButton onClick={toggleModal}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          {children}
        </Stack>
      </Box>
    );
  }

  function ModalContent() {
    const renderCartItems = cartState.cartItems.map((cartItem) => {
      const {id, name, price, quantity} = cartItem;
      const formattedPrice = parseFloat(price).toFixed(2);
      return (
        <Fragment key={id}>
          <Stack sx={{borderBottom: "2px solid #ebe1d9"}}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{py: 1}}
            >
              <Grid item>
                <Typography>{name}</Typography>
                <Typography>${formattedPrice}</Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={{xs: 0.5, sm: 2}}>
                  <Grid item>
                    <Box
                      sx={{
                        backgroundColor: "#ebe1d9",
                        borderRadius: 100,
                        py: 0.3,
                        px: 1.4,
                      }}
                    >
                      <Typography>x{quantity}</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => decreaseQuantityHandler(id)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => increaseQuantityHandler(id)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => removeItemHandler(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Fragment>
      );
    });
    return (
      <>
        {cartState.cartItems.length === 0 && !cartState.checkoutSuccessful ? (
          <Typography variant="h6" textAlign="center">
            Cart is empty
          </Typography>
        ) : !cartState.checkoutSuccessful ? (
          <>
            <Box sx={{overflowY: "auto", flexGrow: 1}}>{renderCartItems}</Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total Price:</Typography>
              <Typography>${formattedTotalPrice}</Typography>
            </Stack>
            <Stack direction="row" spacing={{xs: 2, sm: 5, lg: 13}}>
              <CustomButton onClick={clearCartHandler} sx={{flexGrow: 1}}>
                Clear cart
              </CustomButton>
              <CustomButton
                onClick={() => checkoutHandler({cartState})}
                sx={{borderWidth: 3, flexGrow: 5}}
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Checkout
              </CustomButton>
            </Stack>
          </>
        ) : (
          <Typography variant="h6" textAlign="center">
            Your order has been successfully placed
          </Typography>
        )}
      </>
    );
  }

  return (
    <ModalContainer>
      <ModalContent />
    </ModalContainer>
  );
}
