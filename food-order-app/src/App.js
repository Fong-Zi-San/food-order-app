import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {ItemsContextProvider} from "./components/context/itemsContext";
import theme from "./components/context/themeContext";
import SwitchPage from "./components/shared-components/SwitchPage";
import Footer from "./components/shared-components/Footer";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ItemsContextProvider>
        <SwitchPage />
        <Footer />
      </ItemsContextProvider>
    </ThemeProvider>
  );
}

export default App;
