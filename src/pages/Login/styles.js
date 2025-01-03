import { styled, Box } from "@mui/material";
import { Link as BaseLink } from "react-router-dom";

export const Link = styled(BaseLink)(({ theme }) => ({
  color: `${theme.palette.blue.main} !important`,
  textAlign: "center",
  display: "block",
}));
export const NodeBox = styled(Box)(({ theme }) => ({
  // background: theme.palette.blue.lightBlue,
  background: "#37373c",
  margin: "30px",
  padding: "25px 32px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1);",
  position: "relative",
  // display: 'flex',
  // alignItems: 'start',

  ".refresh-wrap": {
    display: "flex",
    alignItems: "start",
  },

  ".node-text": {
    fontSize: "20px",
    fontWeight: "700",
    // marginLeft: '15px',
    marginBottom: "12px",
    lineHeight: "23px",
    color: "#fff",
  },
  ".ver-text": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },

  input: {
    color: "#fff",
    background: "#000",
    border: "0",
    padding: "10px 15px",
    borderRadius: "5px",
    marginBottom: "10px",
    width: "100%",

    "&:placeholder": {
      color: "#fff",
      opacity: 0.5,
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
    background: "linear-gradient(to right, #0068FF 50%, #00A7FF 100% )",
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
}));
