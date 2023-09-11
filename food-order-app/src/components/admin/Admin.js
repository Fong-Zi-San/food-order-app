import React, {useContext} from "react";
import {Box, Grid} from "@mui/material";
import Dashboard from "./Dashboard";
import AddItemForm from "./AddItemForm";
import Menu from "../shared-components/Menu";
import CustomButton from "../customization/CustomButton";
import {itemsContext} from "../context/itemsContext";

function Admin() {
  const {itemsState, toggleForm} = useContext(itemsContext);

  return (
    <Grid
      container
      sx={{pb: "15rem", minHeight: "100%"}}
      direction="row"
      className="admin-page"
    >
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        className="dashboard-container"
        sx={{backgroundColor: "#c0b8b0"}}
      >
        <Dashboard />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={6}
        md={8}
        lg={9}
        xl={9}
        display="flex"
        flexDirection="column"
        sx={{mb: 5}}
        className="form-menu-container"
      >
        {itemsState.showForm ? (
          <AddItemForm />
        ) : (
          <Box sx={{pt: 2, pl: 2}}>
            <CustomButton onClick={toggleForm}>Add food item</CustomButton>
          </Box>
        )}
        <Menu />
      </Grid>
    </Grid>
  );
}

export default Admin;
