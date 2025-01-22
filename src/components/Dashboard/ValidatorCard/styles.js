import { Button, styled, Typography, TableCell } from "@mui/material";

import { MainCard } from "../../../components/Common/Card/styles";

export const Container = styled(MainCard)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  marginBottom: "24px",
  padding: "0 !important",

  ".validator-status": {
    width: "100%",
    border: "1px solid #3B393C",
    overflow: "hidden",
    borderRadius: "14px",
    ".MuiPaper-root": {
      border: "0 !important",
      borderRadius: "0 !important",
      overflow: "auto",
      ".MuiTableHead-root": {
        background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
        backdropFilter: " blur(64px)",
      },
    },
    "&__card": {
      padding: "10px 25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // borderBottom: "1px solid rgba(255, 255, 255, 0.1)",

      [theme.breakpoints.down(767)]: {
        padding: "15px",
        flexWrap: "wrap",
      },
      [theme.breakpoints.down(467)]: {
        // flexDirection: "column",
        gap: "10px 0",
      },
      h4: {
        color: "#fff",
        // paddingLeft: "30px",
        fontSize: "18px !important",
        fontWeight: 600,
      },
      ".MuiTypography-root": {
        fontSize: "22px",
        fontWeight: "700",
        [theme.breakpoints.down(767)]: {
          fontSize: "16px",
        },
      },
    },
  },

  ".recent-action": {
    ".title": {
      padding: "30px",
      fontSize: "20px",
      fontWeight: "700",
      [theme.breakpoints.down(767)]: {
        padding: "15px",
        fontSize: "16px",
      },
    },

    ".no-data": {
      width: "100%",
      margin: "0",
      textAlign: "center",
    },
  },
}));

export const ValidatorButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  color: theme.palette.text.primary,
  textTransform: "capitalize",

  "&:hover": {
    backgroundColor: theme.palette.blue.main,
    opacity: 0.7,
  },
}));

// export const StyledDivider = styled(Divider)(({ theme }) => ({
//   background: theme.divider,
//   height: '1px',
// }));

export const ActionStatus = styled(Typography)(({ status, theme }) => ({
  color: status?.toLowerCase() === "completed" ? theme.palette.green.main : status?.toLowerCase() === "processing" ? theme.palette.orange.main : theme.palette.text.primary,
}));

export const StyledTableCell = styled(TableCell)(() => ({
  paddingTop: "20px !important",
  paddingBottom: "26px !important",
}));
