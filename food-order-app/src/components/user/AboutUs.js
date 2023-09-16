import React from "react";
import {Typography, Grid, Stack, Link} from "@mui/material";
import brownies from "../../images/aboutus-brownie1.jpg";

function AboutUs() {
  return (
    <Grid
      container
      id="aboutus"
      direction="row"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{px: 2.5, py: 5}}
    >
      <Grid item xs={12} sm={12} md={12} lg={6} xl={8} textAlign="center">
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" fontFamily="Lobster">
            About Us
          </Typography>
          <Typography sx={{fontSize: {xs: "18px", md: "22px"}}}>
            Welcome to Delectable Brownies! We're a home-based brownie business
            with a passion for crafting irresistible, flavorful treats. Each
            brownie is made from scratch using the finest ingredients, ensuring
            a delightful taste in every bite.
          </Typography>
          <Typography sx={{fontSize: {xs: "18px", md: "22px"}}}>
            From classic favorites to unique and exciting flavors, our selection
            caters to all taste buds. Explore our delightful offerings and treat
            yourself or your loved ones to the ultimate brownie experience.
          </Typography>
          <Link
            color="secondary"
            href="#"
            sx={{fontFamily: "Bree Serif", fontSize: {xs: "18px", md: "22px"}}}
          >
            Browse our brownies selection →
          </Link>
        </Stack>
      </Grid>

      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={6}
        xl={4}
        sx={{
          p: 2.5,
        }}
      >
        <img
          src={brownies}
          alt="brownies-galore"
          style={{display: "block", maxWidth: "100%", maxHeight: "100%"}}
        />
      </Grid>
    </Grid>
  );
}

export default AboutUs;
