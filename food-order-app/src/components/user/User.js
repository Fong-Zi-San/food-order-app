import React from "react";
import {Box, Grid} from "@mui/material";
import Cart from "./CartButton";
import Menu from "../shared-components/Menu";
import AboutUs from "./AboutUs";
import Banner from "./Banner";

function User() {
  return (
    <>
      <Cart />
      <Box sx={{pb: "15rem"}} className="user-page">
        <Grid container sx={{mb: 5}}>
          <Banner />
          <AboutUs />
          <Menu />
        </Grid>
      </Box>
    </>
  );
}

export default User;
