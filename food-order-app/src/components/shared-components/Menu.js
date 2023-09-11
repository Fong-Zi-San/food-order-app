import React, {useContext, useEffect} from "react";
import {
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import CustomButton from "../customization/CustomButton";
import CustomCard from "../customization/CustomCard";
import {itemsContext} from "../context/itemsContext";
import {cartContext} from "../context/cartContext";

function Menu() {
  const {itemsState, retrieveItems, deleteItemHandler} =
    useContext(itemsContext);
  const {addToCartHandler} = useContext(cartContext);

  useEffect(() => {
    retrieveItems();
  }, []);

  const renderMenuItems = itemsState.items.map((item) => {
    const {id, name, desc, price, imageUrl} = item;
    const formattedPrice = parseFloat(price).toFixed(2);
    return (
      <Grid item key={id}>
        <CustomCard sx={{height: 390, width: 300}}>
          <CardMedia component="img" height="230" image={imageUrl} alt={name} />
          <Stack direction="row" justifyContent="space-between">
            <CardContent>
              <Stack spacing={1}>
                <Typography>{name}</Typography>
                <Typography variant="body2">{desc}</Typography>
              </Stack>
            </CardContent>
            <CardContent>
              <Typography>${formattedPrice}</Typography>
            </CardContent>
          </Stack>
          <CardActions>
            {itemsState.switchPage ? (
              <CustomButton onClick={() => deleteItemHandler(id)}>
                Delete item
              </CustomButton>
            ) : (
              <CustomButton
                onClick={() => addToCartHandler({id, name, price, quantity: 1})}
              >
                Add to cart
              </CustomButton>
            )}
          </CardActions>
        </CustomCard>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} justifyContent="center" sx={{mx: 2}}>
      <Grid item textAlign="center" sx={{pb: 5}}>
        <Typography variant="h4" fontFamily="Lobster">
          Menu
        </Typography>
      </Grid>
      <Grid item justifyContent="center" alignItems="center">
        <Grid
          container
          spacing={10}
          justifyContent="flex-start"
          className="menu-items-container"
        >
          {renderMenuItems}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Menu;
