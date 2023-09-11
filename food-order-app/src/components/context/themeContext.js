import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ebe1d9",
    },
    secondary: {
      main: "#847c74",
    },
  },
  typography: {
    fontFamily: ["Bree Serif"],
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 670,
      md: 1000,
      lg: 1270,
      xl: 1750,
    },
  },
});

export default theme;
