import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import CustomButton from "../customization/CustomButton";
import "../../App.css";

function Banner() {
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          width: "100%",
          height: "35rem",
          pt: 0,
        }}
        className="banner-container"
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          spacing={2.5}
        >
          <Typography
            color="primary"
            fontFamily="Lobster"
            sx={{fontSize: {xs: "58px", sm: "73px", md: "85px"}}}
          >
            Delectable Brownies
          </Typography>
          <Typography
            color="primary"
            sx={{fontSize: {xs: "18px", sm: "24px", md: "28px"}}}
          >
            Savour the Bliss, One Brownie at a Time!
          </Typography>
          <CustomButton
            href="#aboutus"
            sx={{
              borderRadius: 100,
              p: 1.5,
            }}
          >
            Discover more
          </CustomButton>
        </Stack>
      </Box>
    </>
  );
}

export default Banner;
