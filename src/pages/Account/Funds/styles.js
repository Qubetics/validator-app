import { Box, styled } from "@mui/material";

export const BondWrapper = styled(Box)(({ theme }) => ({
  ".bond-wrapper": {
    maxWidth: "500px",
    width: "100%",
    margin: "0 auto",
    borderRadius: "22px",
    // marginTop: "55px",
    backgroundColor: "#121212",
    padding: "30px",
    borderRadius: "14px",
    border: "1px solid #3B393C",
    position: "relative",
    [theme.breakpoints.down(1440)]: {
      padding: "20px",
    },
    ".fundAvail": {
      fontSize: "14px",
      fontWeight: 400,
      span: {
        color: "#A0A0A0",
      },
    },
    "&__amount": {
      position: "relative",

      ".maxBtn": {
        position: "absolute",
        top: "48px",
        right: "15px",

        "&.MuiButton-root": {
          padding: "5px 25px",
          fontSize: "13px",
          fontWeight: "500",
          borderRadius: "28px",
          // textTransform: "uppercase",
          background: "#121212",
          color: "#fff",
          border: 0,
        },
      },
    },
    "&__title": {
      paddingBottom: "40px",
      borderBottom: "1px solid",
      textAlign: "center",
      border: 0,
      fontSize: "24px",
      fontWeight: "600",
      [theme.breakpoints.down(767)]: {
        fontSize: "18px",
        marginBottom: "10px",
        paddingBottom: "20px",
      },

      "&--flex": {
        paddingBottom: "20px",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down(767)]: {
          flexDirection: "column",
          gap: "20px 0",
          alignItems: "start",
        },
        ".addres-input": {
          marginLeft: "50px",
          marginBottom: "0",
          [theme.breakpoints.down(767)]: {
            marginLeft: "0px",
            maxWidth: "100%",
          },
        },
      },
    },

    ".MuiFormHelperText-root": {
      marginBottom: "5px",
    },
    ".MuiButton-root": {
      fontSize: "18px",
      fontWeight: "500",
      // maxWidth: '425px',
      textTransform: "capitalize",
      padding: "8px 24px",
      borderRadius: "28px",
      [theme.breakpoints.down(767)]: {
        fontSize: "13px",
        maxWidth: "100%",
        padding: "12px",
      },
    },
    ".back-btns": {
      background: "transparent",
      border: 0,
      padding: 0,
      minWidth: "unset !important",
      position: "absolute",
      left: "33px",
      top: "40px",
      [theme.breakpoints.down(1440)]: {
        top: "30px",
      },

      svg: {
        marginRight: "10px",
      },
    },
    h6: {
      fontSize: "14px",
      marginBottom: "50px",
      span: {
        color: "#A0A0A0",
        fontSize: "14px",
      },
    },
  },
}));
