import { styled } from "@mui/material";

export const Wrapper = styled("div")({
  background: "#080808",
  marginBottom: "20px",
  display: "flex",
  borderRadius: "8px",
  justifyContent: "space-between",
  padding: "16px",
  alignItems: "center",
  width: "100%",
  // maxWidth: '215px',

  ".address-text": {
    fontSize: "16px",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  ".copy-btn": {
    background: "transparent",
    border: "0",
    padding: "0",
    cursor: "pointer",
    marginLeft: "10px",
  },
});
