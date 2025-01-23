import { styled, Box } from "@mui/material";
import { Link as BaseLink } from "react-router-dom";

export const Link = styled(BaseLink)(({ theme }) => ({
  color: `${theme.palette.blue.main} !important`,
  textAlign: "center",
  display: "block",
}));
export const NodeBox = styled(Box)(({ theme }) => ({
  maxWidth: "500px",
  width: "100%",
  margin: " 20px auto",
  // background: theme.palette.blue.lightBlue,
  background: "#121212",
  padding: "40px 30px !important",
  borderRadius: "10px",
  border: "1px solid #3B393C",
  position: "relative",
  [theme.breakpoints.down(575)]: {
    padding: "30px 20px !important",
  },
  label: {
    fontSize: "14px",
    color: "#fff",
    fontWeight: "400",
    marginBottom: "0 !important",
    paddingBottom: "8px",
    display: "block",
  },
  ".validNode": {
    padding: "0",
    margin: "0",
    fontSize: "14px",
    marginTop: "4px",
    fontWeight: "400",
    textAlign: "right",
    color: "#FF4E4E",
  },

  ".refresh-wrap": {
    display: "flex",
    alignItems: "start",
  },

  ".node-text": {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "40px",
    position: "relative",
    ".back-btns": {
      position: "absolute",
      left: "0px",
      top: "-10px",
    },
  },
  ".ver-text": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },
  ".MuiInputBase-root": {
    height: "56px !important",
    overflow: "hidden !important",
    borderRadius: "7px",
  },
  input: {
    color: "#fff",
    background: "#080808",
    border: "0",
    padding: "19.5px 16px !important",
    borderRadius: "5px",
    width: "100%",
    borderRadius: "7px !important",
    fontSize: "14px",
    "&:placeholder": {
      color: "#fff",
      opacity: 0.5,
      fontSize: "16px !important",
    },

    "&:focus": {
      boxShadow: "unset",
      outline: "0",
    },
  },

  button: {
    display: "block",
    padding: "5px 10px",
    marginBottom: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    // background: "linear-gradient(to right, #0068FF 50%, #00A7FF 100% )",
    color: "#fff",
    border: "0",
    "&:hover": {
      opacity: "0.6",
    },
  },

  [theme.breakpoints.down(1440)]: {
    padding: "20px",
    ".node-text": {
      fontSize: "16px",
      marginBottom: "7px",
    },
    ".ver-text": {
      fontSize: "12px",
      lineHeight: "16px",
    },
    ".MuiSvgIcon-fontSizeMedium": {
      fontSize: "24px",
    },
  },

  [theme.breakpoints.down(767)]: {
    margin: "20px",
  },
  ".back-btns": {
    background: "transparent !important",
    border: "0 !important",
  },
}));
