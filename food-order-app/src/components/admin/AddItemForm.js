import React, {useContext, useState, useRef} from "react";
import {Stack, TextField, Box, Alert, Fade} from "@mui/material";
import CustomButton from "../customization/CustomButton";
import {itemsContext} from "../context/itemsContext";

function AddItemForm() {
  const {itemsState, addItemHandler, toggleForm} = useContext(itemsContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [nameInputError, setNameInputError] = useState(false);
  const [descInputError, setDescInputError] = useState(false);
  const imageInputRef = useRef(null);

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
    if (imageInputRef) {
      imageInputRef.current.value = null;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length === 1) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    const formattedPrice = Number(price).toFixed(2);
    addItemHandler({
      name,
      desc,
      price: Number(formattedPrice),
      image: image,
    });
    clearForm();
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
            />
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
            />
            <TextField
              required
              variant="outlined"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              required
              name="img"
              id="img"
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageChange}
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
