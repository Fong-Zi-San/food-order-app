import React, {Fragment, useState, useEffect, useRef} from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  IconButton,
  Popper,
  Paper,
  Grow,
  MenuItem,
  MenuList,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Dashboard() {
  const [openMenus, setOpenMenus] = useState({});
  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem("orders")) || []
  );

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  // Refs for IconButton elements
  const anchorRefs = useRef({});

  const toggleMenu = (orderId) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [orderId]: !prevOpenMenus[orderId],
    }));
  };

  const handleCloseMenu = (orderId) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [orderId]: false,
    }));
  };

  // Complete/cancel order options delete the order for now, but can be further modified for other functions in the future
  const deleteOrderHandler = (orderId) => {
    const updatedOrders = orders.filter((order) => {
      return order.orderId !== orderId;
    });
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const renderOrders = orders.map((order) => {
    const {orderId, orderItems, totalPrice} = order;
    const displayId = orderId.substring(0, 8);

    const renderOrderItems = orderItems.map((orderItem) => {
      const {id, name, quantity} = orderItem;
      return (
        <Fragment key={id}>
          <ListItem>
            <ListItemText>{name}</ListItemText>
            <Box
              sx={{
                backgroundColor: "#ebe1d9",
                borderRadius: 100,
                px: 1,
              }}
            >
              <ListItemText>x{quantity}</ListItemText>
            </Box>
          </ListItem>
          <Divider variant="middle" />
        </Fragment>
      );
    });

    return (
      <Fragment key={orderId}>
        <Box
          sx={{
            border: "3px solid #ebe1d9",
            borderRadius: 5,
            my: 2,
            pl: 1.5,
            pr: 0.5,
          }}
        >
          <List>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Order #{displayId}</Typography>
              <IconButton
                ref={(ref) => (anchorRefs.current[orderId] = ref)}
                aria-controls={`menu-list-grow-${orderId}`}
                aria-haspopup="true"
                onClick={() => toggleMenu(orderId)}
              >
                <MoreVertIcon />
              </IconButton>
            </Stack>
            {renderOrderItems}
            <ListItem>
              <ListItemText>Total price: ${totalPrice}</ListItemText>
            </ListItem>
          </List>

          <Popper
            open={openMenus[orderId] || false}
            anchorEl={anchorRefs.current[orderId]}
            transition
            disablePortal
          >
            {({TransitionProps}) => (
              <Grow {...TransitionProps}>
                <Paper
                  sx={{
                    backgroundColor: "#d7a27e",
                    color: "#3b2321",
                    borderRadius: 2,
                  }}
                >
                  <ClickAwayListener
                    onClickAway={() => handleCloseMenu(orderId)}
                  >
                    <MenuList
                      autoFocusItem={openMenus[orderId]}
                      id={`menu-list-grow-${orderId}`}
                      onKeyDown={() => handleCloseMenu(orderId)}
                      sx={{p: 0}}
                    >
                      <MenuItem
                        onClick={() => deleteOrderHandler(orderId)}
                        divider
                      >
                        Order completed
                      </MenuItem>
                      <MenuItem onClick={() => deleteOrderHandler(orderId)}>
                        Cancel order
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Fragment>
    );
  });

  return (
    <Grid item sx={{p: 3, width: "100%"}}>
      <Grid item sx={{pb: 1}}>
        <Typography fontFamily="Lobster" variant="h4">
          Dashboard
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          pt: 2,
          overflowY: "auto",
          maxHeight: {xs: "70vh", sm: "100%"},
        }}
      >
        {!orders ? <Typography>No orders available</Typography> : renderOrders}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
