import { styled, Box } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  ".common-wrapper": {
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "22px",
    padding: "37px 0",
    position: "relative",
    background: "#121212",
    border: "1px solid #3B393C",
    padding: "30px",
    [theme.breakpoints.down(1440)]: {
      padding: "20px",
    },

    ".inputFields": {
      ".MuiInputBase-input": {
        background: "#080808",
        borderRadius: "7px",
      },
      ".css-9425fu-MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent !important",
        borderRadius: "7px",
      },
      ".MuiInputBase-input::placeholder": {
        color: "#fff",
        opacity: 0.5,
      },
    },
    h6: {
      fontSize: "14px",
      span: {
        color: "#A0A0A0",
        fontWeight: 500,
      },
    },
    "&__amount": {
      position: "relative",

      ".maxBtn": {
        position: "absolute",
        top: "43px",
        right: "15px",

        "&.MuiButton-root": {
          padding: "5px 25px",
          fontSize: "13px",
          fontWeight: "700",
          borderRadius: "28px",
          // textTransform: "uppercase",
          background: "#121212",
          color: "#fff",
          border: 0,
        },
        ".MuiButton-outlined": {
          borderColor: "transparent",
        },
      },
    },
    "&__title": {
      marginBottom: "20px",
      paddingBottom: "30px",
      fontSize: "24px",
      fontWeight: "700",

      [theme.breakpoints.down(1440)]: {
        fontSize: "18px",
      },

      "&--flex": {
        paddingBottom: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        [theme.breakpoints.down(1440)]: {
          gap: "20px 0",
          alignItems: "start",
          justifyContent: "center",
        },

        ".addres-input": {
          marginLeft: "50px",
          marginBottom: "0",

          [theme.breakpoints.down(1440)]: {
            marginLeft: "0px",
          },
          [theme.breakpoints.down(767)]: {
            maxWidth: "100%",
          },
        },
      },
    },
    ".mnemonicsItems": {
      position: "relative",

      svg: {
        position: "absolute",
        right: 20,
        top: "50px",
      },
    },
    "&__subText": {
      fontSize: "18px",
      display: "block",
      margin: "15px 0",
      color: theme.palette.text.secondary,
      [theme.breakpoints.down(1440)]: {
        fontSize: "14px",
        margin: "7px 0",
      },
    },

    "&__infoBox": {
      display: "flex",
      alignItems: "start",
      gap: "20px 60px",
      margin: "45px 0",
      [theme.breakpoints.down(1440)]: {
        flexWrap: "wrap",
      },
    },
    "&__bottomBox": {
      "&__title": {
        marginBottom: "5px",
        fontSize: "16px",
        [theme.breakpoints.down(1440)]: {
          fontSize: "13px",
        },
      },
      "&__subtitle": {
        fontSize: "30px",
        fontWeight: "700",
        [theme.breakpoints.down(1440)]: {
          fontSize: "22px",
        },

        "&--flex": {
          display: "flex",
          alignItems: "end",
        },
        span: {
          display: "inline-block",
          marginBottom: "-5px",
          marginLeft: "15px",
          color: theme.palette.blue.main,
          background: theme.palette.blue.lightBlue,
          borderRadius: "6px",
          padding: "5px 15px",
          fontSize: "12px",
          [theme.breakpoints.down(1440)]: {
            fontSize: "9px",
          },
        },
      },
    },

    ".genrate-key": {
      position: "relative",

      "&__btns": {
        "&.MuiButton-root": {
          position: "absolute",
          top: "42px",
          right: "8px",
          maxWidth: "170px",
          fontSize: "13px",
          fontWeight: "500",
          padding: "10px 24px",
          [theme.breakpoints.down(767)]: {
            position: "static",
            marginBottom: "20px",
          },
        },
      },
    },

    ".MuiFormHelperText-root": {
      marginBottom: "12px",
    },
    ".MuiButton-root": {
      fontSize: "20px",
      fontWeight: "500",
      // maxWidth: '425px',
      textTransform: "unset",
      borderRadius: "28px",
      [theme.breakpoints.down(1440)]: {
        fontSize: "16px",
        padding: "10px",
      },
      [theme.breakpoints.down(767)]: {
        maxWidth: "100%",
      },
    },

    "&__top-content": {
      flex: "1 0",
      [theme.breakpoints.down(1440)]: {
        gap: "20px",
      },

      "&:first-of-type": {
        marginRight: "30px",
        [theme.breakpoints.down(1440)]: {
          marginRight: "0",
        },
        [theme.breakpoints.down(467)]: {
          flexDirection: "column",
          // justifyContent: 'flex-start',
        },
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
    label: {
      marginBottom: "12px",
      display: "block",
    },
  },
  ".commonBtns": {
    paddingTop: "40px",
  },
}));
