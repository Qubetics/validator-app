import { Paper, styled, Pagination as MuiPagination } from "@mui/material";

import FlexBox from "../../Common/FlexBox";

export const TabsSection = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  margin: "43px 0 22px",
  gap: "20px",
  [theme.breakpoints.down(1324)]: {
    flexDirection: "column",
    alignItems: "end",
  },
}));

export const Search = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "550px",
  padding: "10px 30px",
  borderRadius: "16px !important",
  boxShadow: "none",
  background: "#37373c!important",
  border: `1px solid rgba(255, 255, 255, 0.1)`,

  [theme.breakpoints.down(1440)]: {
    maxWidth: "350px",
    padding: "10px 20px",
  },
  [theme.breakpoints.down(767)]: {
    maxWidth: "100%",
    padding: "10px 12px",
  },

  ".MuiInputBase-root": {
    marginLeft: 0,

    ".MuiInputBase-input": {
      color: theme.palette.text.white,
      fontSize: "16px",
    },
    ".MuiInputBase-input::placeholder": {
      opacity: "1",
      color: "white",
    },
  },

  [theme.breakpoints.down(1324)]: {
    width: "100%",
    marginTop: 15,
  },
}));
export const InputSearch = styled(Paper)(({ theme }) => ({
  maxWidth: "540px",
  width: "100%",
  ".MuiInputBase-root": {
    backgroundColor: "#121212",
    borderRadius: "14px",
    height: "56px",
    "&:hover": {
      border: "1px solid #3B393C",
      borderRadius: "14px",
    },
  },
  ".MuiButtonBase-root": {
    position: "absolute",
    right: "7px",
    height: "36px",
    top: "10px",
  },
}));
export const Pagination = styled(MuiPagination)(({ theme }) => ({
  ".MuiPaginationItem-previousNext": {
    backgroundColor: "transparent",
    "&:hover": {
      // opacity:"0.7",
      backgroundColor: "transparent",
    },
  },
  ".MuiPaginationItem-root.Mui-selected": {
    border: `1px solid #3B393C`,
    borderRadius: "8px",
  },
  ".MuiPaginationItem-root.Mui-disabled": {
    background: "trasparent",
    border: 0,
    opacity: "1",
  },
}));
