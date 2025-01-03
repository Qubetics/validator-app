import { Box, Container as BaseContainer, styled } from "@mui/material";
import bgMain from "../../assets/Images/welcome.png";
export const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "black",
  backgroundImage: `url(${bgMain})`,
  position: "relative",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  ".MuiTableCell-root": {
    borderBottom: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    whiteSpace: "nowrap",
    padding: "16px 28px",
    fontSize: "16px",
    fontWeight: "300 !important",
    color: "#A0A0A0",
    ".notDiabled": {
      a: {
        marginRight: "10px",
        fontWeight: "600",
        fontSize: "14px",
        border: "2px solid transparent",
        background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
        conic-gradient(
          from 180deg at 50% 50%,
          #ff98e2,
          #ffc876 35.77deg,
          #79fff7 153.75deg,
          #9f53ff 258.75deg,
          #ff98e2 360deg
        ) border-box`,
        borderRadius: "25px",
        transition: "color 0.2s ease-out, filter 0.2s ease-out",
        "--bg": "#000",
        "--hover-bg": "var(--theme-gradients-main)",
        "--text": "#fff",
        "--hover-text": "#000",
        "&:hover": {
          opacity: "0.8",
        },
        span: {
          fontSize: "14px",
        },
      },
    },

    [theme.breakpoints.down(767)]: {
      padding: "10px 20px",
    },
    span: {},
    p: {
      color: "#A0A0A0",
      fontSize: "16px",
      textTransform: "capitalize",
      fontWeight: "300",
    },
  },
  ".MuiTableHead-root": {
    backgroundColor: "#121212",
    color: "#fff",
    p: {
      color: "#fff",
      fontWeight: "300",
      fontSize: "16px",
    },
    ".MuiTableCell-root": {
      padding: "22px 28px",
      fontWeight: "300 !important",
      color: theme.palette.text.secondary,

      [theme.breakpoints.down(767)]: {
        padding: "10px 20px",
        fontSize: "13px",
        span: {},
        ".MuiTypography-label": {
          fontSize: "13px",
        },
        ".MuiTypography-body1": {
          fontSize: "13px",
        },
      },
      p: {
        display: "flex",
        gap: "6px",
        ".MuiButtonBase-root ": {
          padding: "0 !important",
        },
      },
    },
  },
  ".MuiTableBody-root": {
    backgroundColor: "#121212",
    [theme.breakpoints.down(767)]: {
      ".MuiTypography-body2": {
        fontSize: "13px",
      },
    },
  },

  ".MuiContainer-root": {
    width: "1440px !important",
    ".manageAccountDetails": {
      padding: "18px 0",
    },
    [theme.breakpoints.down(1440)]: {
      // width: "75% !important",
    },

    [theme.breakpoints.down(999)]: {
      width: "100% !important",
    },
  },
  ".MuiPaper-root": {
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid #3B393C",
    borderRadius: "14px !important",
    background: "#121212",
    overflow: "hidden",
    "&:hover": {
      border: "1px solid ##3B393C",
      borderRadius: 0,
    },
    ".disablebutton": {
      background: "#121212",
      color: "#fff",
      border: "0",
      padding: "10px 30px",
      borderRadius: "10px",
      opacity: "0.6",
      [theme.breakpoints.down(1499)]: {
        padding: "10px 17px",
      },
      [theme.breakpoints.down(767)]: {
        padding: "10px 14px",
      },
    },
  },
  ".MuiButton-root": {
    padding: "12px 16px",
    marginBottom: "10px",
    border: "2px solid transparent",
    background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
    conic-gradient(
      from 180deg at 50% 50%,
      #ff98e2,
      #ffc876 35.77deg,
      #79fff7 153.75deg,
      #9f53ff 258.75deg,
      #ff98e2 360deg
    ) border-box`,
    borderRadius: "25px",
    transition: "color 0.2s ease-out, filter 0.2s ease-out",
    "--bg": "#000",
    "--hover-bg": "var(--theme-gradients-main)",
    "--text": "#fff",
    "--hover-text": "#000",
    [theme.breakpoints.down(1499)]: {
      padding: "10px 17px",
    },
    [theme.breakpoints.down(767)]: {
      fontSize: "12px",
      borderRadius: "10px",
      whiteSpace: "nowrap",
      padding: "10px 15px",
    },
    "&:hover": {
      // background: "#0080ff",
      opacity: "0.7",
    },
  },
  ".disable": {
    // background:"red",
    opacity: "0.7",
  },
  ".MuiButton-outlined": {
    borderColor: theme.palette.blue.main,
    color: theme.palette.blue.main,

    "&:hover": {
      borderColor: theme.palette.blue.main,
    },
  },
  ".MuiButton-contained": {
    "&.primary-btn": {
      background: " linear-gradient(to right, #0068FF 50%, #00A7FF 100% )",

      "&:hover": {
        background: "transparent ",
        color: "#1677ff",
        borderColor: "#1677ff",
      },
    },
    "&.dark-btn": {
      background: theme.palette.secondary.dark,
      color: "#787A8D",
    },

    "&.Mui-disabled": {
      opacity: "0.7",
      color: "#fff",
      pointerEvents: "visible",
      cursor: "not-allowed !important",

      "&:hover": {
        opacity: "0.7",
      },
    },
  },
}));

export const Container = styled(BaseContainer)(({ theme }) => ({
  maxWidth: "100% !important",
  // width: ismobile === 'true' ? 'calc(100% - 60px)' : 'calc(100% - 400px)',
  // margin: ismobile === 'true' ? '30px' : '65px 60px 65px 30px',
  // marginLeft: '335px',
  padding: "40px 30px",

  // [theme.breakpoints.down(1680)]: {
  //   width: ismobile === 'true' ? 'calc(100% - 60px)' : 'calc(100% - 385px)',
  // },
  [theme.breakpoints.down(1440)]: {
    // margin: ismobile === 'true' ? '60px 30px 30px' : '45px',
    // marginLeft: '300px',
  },

  ".open-icon": {
    position: "absolute",
    top: "20px",
  },

  // '.MuiTableCell-body': {
  //   padding: '16px 30px',

  //   '.MuiTypography-body1': {
  //     padding: '10px 20px',
  //   },
  // },

  ".block-table": {
    ".MuiTableCell-head": {
      // '&:first-of-type': {
      //   paddingLeft: '98px',
      //   [theme.breakpoints.down(767)]: {
      //     paddingLeft: '85px',
      //   },
      // },
    },

    ".MuiTableCell-body": {
      padding: "16px 28px",
      [theme.breakpoints.down(767)]: {
        padding: "10px 20px",
      },
    },
  },

  ".validator-table": {
    backgroundColor: "#252527",
    // '.MuiTableCell-head': {
    //   paddingLeft: '16px',
    //   paddingRight: '16px',
    // },
  },

  ".custom-divider": {
    margin: "20px 0 15px",
    borderColor: "#3b393c",
  },

  ".primary-btn": {
    borderRadius: "15px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "20px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.25s linear",
    border: "1px solid",
    borderColor: "rgba(0, 104, 255, 1)",
    color: "white",
    svg: {
      path: {
        fill: theme.palette.text.primary,
        transition: "all 0.25s linear",
      },
    },
    "&:hover": {
      svg: {
        path: {
          transition: "all 0.25s linear",
          fill: "#1677ff",
        },
      },
    },

    [theme.breakpoints.down(767)]: {
      fontSize: "16px",
      padding: "12px",
    },
  },
  ".outline-btn": {
    borderRadius: "15px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "20px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.25s linear",
    background: "rgba(52, 108, 222, 0.2)",
    border: "1px solid",
    color: theme.palette.blue.main,
    borderColor: theme.palette.blue.main,

    svg: {
      path: {
        transition: "all 0.25s linear",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,

      svg: {
        path: {
          transition: "all 0.25s linear",
          fill: theme.palette.text.primary,
        },
      },
    },
    [theme.breakpoints.down(767)]: {
      fontSize: "16px",
      padding: "12px",
    },
  },

  ".common-table": {
    "&.Bondtable": {
      ".title": {
        fontSize: "18px",
        fontWeight: 600,
        paddingBottom: "20px",
      },
      ".MuiTableContainer-root": {
        border: "1px solid #3B393C",
        borderRadius: "14px",
      },
    },
    // background:
    // " linear-gradient(88deg,hsla(0,0%,100%,0) 1.62%,hsla(0,0%,100%,.1) 48.43%,hsla(0,0%,100%,0) 98.38%)",
    borderRadius: "22px",
    // paddingBottom: "35px",
    paddingTop: "10px",
    ".MuiPaginationItem-root.Mui-selected": {
      border: "1px solid #3B393C",
      background: "#121212",
    },
    ".Nodata": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      flexDirection: "column",
      border: "1px solid #383939",
      padding: "20px",
      borderRadius: "20px",
    },

    h3: {
      fontSize: "22px",
      padding: "10px 2px 13px",
      // paddingTop: "37px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down(767)]: {
        fontSize: "16px",
        padding: "20px",
      },
    },
    ".view-all": {
      fontSize: "16px",
      color: "#fff",
      textDecoration: "none",
      transition: "all 0.2s linear",
      backgroundColor: "#161616",
      border: "1px solid #454545",
      borderRadius: "30px",
      fontSize: "14px",
      maxWidth: "123px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      "&:hover": {
        color: "#FFFFFF",
        opacity: "0.8",
      },
    },
  },

  ".auth-wrapper": {
    ".addres-input": {
      marginBottom: "0",
      maxWidth: "fit-content",
    },
    "&__inner": {
      paddingTop: "115px",
      maxWidth: "885px",
      margin: "0 auto",

      [theme.breakpoints.down(1440)]: {
        paddingTop: "50px",
      },

      h3: {
        marginBottom: "5px",
      },

      ".address-field": {
        marginBottom: "20px",
      },
    },

    "&__backbtn": {
      textAlign: "right",
    },
    "&__btns": {
      display: "flex",
      gap: "0 30px",
      paddingTop: "50px",
      [theme.breakpoints.down(767)]: {
        flexDirection: "column",
        gap: "15px 0",
      },

      ".primary-btn": {
        flex: "1",
        height: "68px",
      },

      ".outline-btn": {
        flex: "1",
      },
    },
  },

  ".btn-icon": {
    display: "inline-block",
    marginRight: "15px",
    lineHeight: "0",
  },

  ".id-wrap": {
    display: "flex",
    alignItems: "center",

    "&__icon": {
      "&--mr-0": {
        marginRight: 0,
      },
    },
  },
  ".vaildator-card": {
    background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
    border: "1px solid hsla(0, 4.1%, 47.5%, 0.1)",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "flex-start !important",
    "&__main": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      h5: {
        color: "#fff",
        opacity: "0.6",
        fontSize: "16px",
        fontWeight: 300,
      },
      h4: {
        fontSize: "20px",
        fontWeight: "400",
        paddingTop: "8px",
      },
    },

    "&__icon": {
      marginRight: "16px",
    },
    "&__tooltip": {
      position: "absolute",
      top: "5px",
      right: "5px",

      ".MuiSvgIcon-fontSizeMedium": {
        fontSize: "18px",
      },
    },
  },

  ".not-found": {
    textAlign: "center",
    padding: "30px",

    img: {
      width: "250px",
      height: "250px",
      marginBottom: "20px",
      [theme.breakpoints.down(767)]: {
        width: "150px",
        height: "150px",
      },
    },

    " &__text": {
      fontSize: "18px",
    },
  },

  [theme.breakpoints.down(767)]: {
    ".MuiTypography-h3": {
      fontSize: "18px",
      marginBottom: "10px",
    },
    ".MuiTypography-body1": {
      fontSize: "15px",
    },
  },

  ".back-btn": {
    all: "unset",
    cursor: "pointer",
    opacity: "1",
    transition: "all linear 0.25s",

    "&:hover": {
      opacity: "0.7",
    },
  },

  ".circular-progress": {
    width: "15px !important",
    height: "15px !important",
    color: "#fff",
  },
  ".table-wrap": {
    position: "relative",

    ".nominate-btns": {
      position: "absolute",
      top: "-65px",
      right: "0",
    },

    ".MuiTableBody-root": {
      ".MuiTableRow-root": {
        cursor: "pointer",
        "&:hover": {
          background: "rgba(47, 71, 119, 0.1)",
        },
      },
    },
  },

  ".bonds-btns": {
    padding: "7px 20px",
    // border: "1px solid",
    borderRadius: "8px",
    // margin: "0 5px",
    textDecoration: "none",
    fontSize: "13px",
    display: "inline-block",
    transition: "all linear 0.25s",
    color: "#fff",
    fontWeight: "700 !important",
  },
  ".status-active": {
    color: "#1AD598 !important",
  },
  ".status-inactive": {
    color: "#ED0800 !important",
  },
  ".status-waiting": {
    color: "#F9B959 !important",
  },

  ".tooltip-common": {
    ".MuiSvgIcon-fontSizeMedium": {
      fontSize: "12px",
    },
  },
  ".mt-5": {
    marginTop: "40px !important",
  },

  ".validator-address": {
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    // maxWidth: "550px",
    marginBottom: "30px",

    ".addres-input": {
      // marginLeft: "30px",
      marginBottom: "0",
    },
  },
  ".content-wrap": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px 30px",

    [theme.breakpoints.down(1440)]: {
      padding: "0 20px 20px",
    },
    [theme.breakpoints.down(574)]: {
      padding: "0 15px 15px",
    },
  },

  ".p-0": {
    padding: "0 !important",
  },
  ".text-hover": {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.15s linear",
    "&:hover": {
      color: "#68afef",
    },
  },
}));
export const Searchbar = styled(Box)(({ theme }) => ({
  maxWidth: "685px",
  width: "100%",
  ".MuiFormControl-root": {
    background: "#121212",
    color: "#A0A0A0",
    border: "1px solid #3B393C",
    borderRadius: "14px",
    marginBottom: "40px",
  },
  ".css-1owsj0s-MuiInputBase-root-MuiOutlinedInput-root": {
    borderRadius: "14px",
    "&:hover": {
      border: 0,
      outline: "unset",
    },
  },
}));
