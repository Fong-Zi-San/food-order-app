import React, {useContext, useState} from "react";
import {Stack, TextField, Box, Alert, Fade} from "@mui/material";
import CustomButton from "../customization/CustomButton";
import {itemsContext} from "../context/itemsContext";

let PROJECT_ID = "dlc2edjl";
let DATASET = "production";
let URL = `https://${PROJECT_ID}.api.sanity.io/assets/images/${DATASET}`;

function AddItemForm() {
  const {itemsState, addItemHandler, toggleForm} = useContext(itemsContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);

  //validation check to ensure name length is ≤20
  const maxNameLength = 20;
  const validateName = (inputName) => {
    if (inputName.length > maxNameLength) {
      setNameInputError(true);
    } else {
      setNameInputError(false);
    }
  };

  //validation check to ensure description length is ≤45
  const maxDescLength = 45;
  const validateDesc = (inputDesc) => {
    if (inputDesc.length > maxDescLength) {
      setDescInputError(true);
    } else {
      setDescInputError(false);
    }
  };

  const clearForm = () => {
    setName("");
    setDesc("");
    setPrice("");
    setImage(null);
  };

  const fileReader = new FileReader();
  let base64Image = null;
  fileReader.onload = function (e) {
    base64Image = e.target.result;
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!nameInputError) {
      const formData = new FormData();
      formData.append("format", "json");
      if (base64Image) {
        formData.append("source", base64Image);
      }
      try {
        const response = await fetch(URL, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const imageData = await response.json();
          console.log("Image uploaded:", response);
          const formattedPrice = Number(price).toFixed(2);
          addItemHandler({
            name,
            desc,
            price: Number(formattedPrice),
            imageUrl: imageData.image.url,
          });
          clearForm();
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    } else {
      base64Image = null;
    }
  };

  return (
    <Fade in={itemsState.showForm} mountOnEnter unmountOnExit>
      <form onSubmit={addItem}>
        <Box
          sx={{
            backgroundColor: "#d7a27e",
            m: 4,
            p: 2,
            borderRadius: 5,
            width: "16rem",
          }}
          className="add-item-form-container"
        >
          <Stack direction="column" spacing={2}>
            {nameInputError && (
              <Alert severity="warning">
                Name must be less than {maxNameLength} characters
              </Alert>
            )}
            {descInputError && (
              <Alert severity="warning">
                Description must be less than {maxDescLength} characters
              </Alert>
            )}
            <TextField
              required
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
            ></TextField>
            <TextField
              required
              multiline
              variant="outlined"
              label="Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                validateDesc(e.target.value);
              }}
            ></TextField>
            <TextField
              required
              variant="outlined"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>
            <input
              // required
              name="img"
              id="img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{fontFamily: "Bree Serif", fontSize: "1rem"}}
            />
            <Stack direction="row" spacing={1}>
              <CustomButton
                type="submit"
                sx={{width: "50%"}}
                disabled={nameInputError || descInputError}
              >
                Add
              </CustomButton>
              <CustomButton onClick={toggleForm} sx={{width: "50%"}}>
                Cancel
              </CustomButton>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Fade>
  );
}

export default AddItemForm;
