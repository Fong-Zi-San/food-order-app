import React, {useContext} from "react";
import {Grid, Box, Typography, Stack} from "@mui/material";
import CustomButton from "../customization/CustomButton";
import {itemsContext} from "../context/itemsContext";
import logo from "../../images/logo.png";
import "../../App.css";

function Footer() {
  const {itemsState, togglePage} = useContext(itemsContext);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2.5}
      className="footer-container"
      sx={{
        position: "absolute",
        bottom: 0,
        height: "15rem",
        backgroundColor: "#847c74",
      }}
    >
      <Grid item>
        <Box
          sx={{backgroundColor: "#ebe1d9", borderRadius: 100, pl: 0.8}}
          className="logo-wrapper"
        >
          <img src={logo} alt="logo" className="logo" style={{height: 140}} />
        </Box>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">Switch to:</Typography>
          <CustomButton onClick={togglePage}>
            {itemsState.switchPage ? "User" : "Admin"}
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Footer;
