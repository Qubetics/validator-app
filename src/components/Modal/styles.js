import { Button, Dialog, styled, Backdrop } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  zIndex: 20000,
  backgroundColor: "rgba(8, 19, 44, 0.4)",
  backdropFilter: "blur(5px)",
  "& .MuiPaper-root": {
    minWidth: 320,
    maxWidth: "460px",
    padding: "30px 24px",
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.blue.main}`,
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
  },
}));

export const OkButton = styled(Button)(({ theme }) => ({
  width: 150,
  backgroundColor: theme.palette.blue.main,
  border: "none",
  color: theme.palette.text.primary,
  textTransform: "capitalize",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: theme.palette.blue.main,
    border: "none",
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  width: 150,
  backgroundColor: "transform",
  border: "1px solid #2C4378",
  color: theme.palette.text.primary,
  textTransform: "capitalize",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "transform",
    border: "1px solid #2C4378",
  },
}));
