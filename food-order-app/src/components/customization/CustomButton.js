import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)({
  fontSize: 16,
  fontFamily: "Bree Serif",
  color: "#3b2321",
  backgroundColor: "#d7a27e",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "#ece3db",
  borderRadius: "20px",
  padding: "6px 12px",
  "&:hover": {
    backgroundColor: "#c08b6b",
    boxShadow: "none",
  },
});

export default CustomButton;
