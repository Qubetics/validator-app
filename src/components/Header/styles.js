import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)(({ isopen, theme }) => ({
  position: "relative",
  minHeight: "100vh",
  width: "20%",
  background: "#212122",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  flexShrink: "0",
  zIndex: "20",
  justifyContent: "start",
  overflowY: "auto",
  [theme.breakpoints.down(1440)]: {
    width: "22%",
  },

  [theme.breakpoints.down("md")]: {
    width: "300px",
    position: "fixed",
    left: 0,
    transform: isopen === "true" ? "translateX(0%)" : "translateX(-100%)",
    top: 0,
    transition: "all .5s",

    ".close-btn": {
      position: "absolute",
      right: "15px",
      top: "10px",

      ".MuiSvgIcon-fontSizeMedium": {
        fontSize: "24px",
      },
    },
  },
  flex_item: {
    display: "flex",
  },
  ".sidebar-logo": {
    justifyContent: "flex-start",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "25px 50px",

    [theme.breakpoints.down(1440)]: {
      padding: "20px",
      justifyContent: "flex-start",
      img: {
        maxWidth: "150px",
      },
    },

    img: {
      maxWidth: "175px",
      width: "100%",
      [theme.breakpoints.down(767)]: {
        maxWidth: "150px",
      },
    },
  },

  ".nav-item-list": {
    maxHeight: "300px",
    overflowY: "auto",
  },
}));

export const WalletDetails = styled(Box)(({ theme }) => ({
  padding: "30px",
  paddingLeft: "50px",
  background: "#37373c",
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
  ".addressCopy": {
    backgroundColor: "rgb(37, 37, 39)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    padding: "16px 15px",
    maxwidth: " 290px",
    width: "100%",
    span: {
      maxWidth: "230px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "block",
      [theme.breakpoints.down(767)]: {
        maxWidth: "200px",
      },
    },
    svg: {
      fontSize: "22px",
    },
  },

  ".wallet-name": {
    fontSize: "20px",
    marginBottom: "12px",
    textTransform: "capitalize",
  },
  ".wallet-balance": {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    marginBottom: "7px",
    textTransform: "capitalize",

    "&__amount": {
      fontSize: "24px",
      fontWeight: "700",
      wordBreak: "break-all",
    },
  },
  ".MuiSvgIcon-root": {
    fill: "transparent",
    flexShrink: "0",
  },

  [theme.breakpoints.down(1440)]: {
    ".wallet-name": {
      fontSize: "15px",
      marginBottom: "7px",
    },
    ".wallet-balance": {
      fontSize: "13px",

      "&__amount": {
        fontSize: "22px",
      },
    },
  },
  [theme.breakpoints.down(1440)]: {
    br: {
      display: "none",
    },
    padding: "20px",
    ".wallet-balance": {
      marginBottom: "0",
      fontSize: "11px",

      "&__amount": {
        fontSize: "18px",
      },
    },
  },
}));

export const NavItem = styled(Link)(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  padding: "15px 50px",
  textDecoration: "none",
  color: active === "true" ? theme.palette.blue.main : theme.palette.text.secondary,

  ".MuiTypography-root": {
    fontSize: "18px",
  },
  ".MuiSvgIcon-root": {
    flexShrink: "0",
    fontSize: "20px",
    path: {
      fill: active === "true" ? theme.palette.blue.main : theme.palette.text.secondary,
    },
  },
  [theme.breakpoints.down(1440)]: {
    padding: "10px 20px",

    ".MuiTypography-root": {
      fontSize: "16px",
    },
    ".MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
  [theme.breakpoints.down(767)]: {
    padding: "5px 20px",

    ".MuiTypography-root": {
      fontSize: "13px",
    },
    ".MuiSvgIcon-root": {
      fontSize: "16px",
    },
  },
}));

export const SubLink = styled(Link)(({ theme, active }) => ({
  ...theme.typography.body2,
  textDecoration: "none",
  textTransform: "capitalize",
  color: active === "true" ? `${theme.palette.blue.main} !important` : `${theme.palette.text.secondary} !important`,
}));

export const NodeBox = styled(Box)(({ theme }) => ({
  background: theme.palette.blue.lightBlue,
  margin: "30px",
  padding: "25px 32px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "start",

  ".node-text": {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#fff",
  },
  ".ver-text": {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
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

// export const SidebarWrapper = styled(Box)(({ isopen, theme }) => ({
//   position: 'fixed',
//   top: '0',
//   bottom: '0',
//   zIndex: '9999',
//   [theme.breakpoints.down('md')]: {
//     width: isopen === 'true' ? '100vw' : '0vw',
//     background: 'rgba(0, 0,0, 0.5)',
//   },
// }));

// style.js

export const Mobilereasponsive = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "0",
  zIndex: 99999,
  ".mobileresponsive": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 20px",
    backgroundColor: "#121212",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "991px",
    width: "100%",
    margin: "auto",
    display: "none",

    [theme.breakpoints.down(991)]: {
      display: "flex!important",

      // display: "block !important",
      justifyContent: "space-between",
    },
  },
  ".headerWrapper": {
    ".header": {
      flexDirection: "column !important",
    },
  },
}));

export const Drawersidebar = styled(Box)(({ theme }) => ({
  ".MuiDrawer-root": {
    background: "#000",
  },
  ".headerWrapper": {
    backgroundColor: "#121212",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "320px",
  },

  ".header": {
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "25px 20px",
    backgroundColor: "#121212",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: "auto",
    gap: "20px",
  },
  ".logo": {
    marginRight: "auto",
  },
  ".headerLinks": {
    marginRight: "auto",
    ul: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
    li: {
      display: "flex",
      margin: "0 15px",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },

    ".link": {
      textDecoration: "none",
      color: "#A0A0A0",
      fontSize: "16px",
      fontWeight: "700",
      textTransform: "capitalize",
      padding: 0,
      width: "100%",
      display: "block",
      whiteSpace: "nowrap",
      ".link.active": {
        color: "#007bff" /* Example color for active link */,
        fontWeight: "bold",
      },
    },
    ".switchApp button": {
      color: "#a0a0a0",
      fontSize: "15px",
      fontWeight: 700,
      textTransform: "capitalize",
      padding: 0,
      " .MuiPaper-root .css-o821ap-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
        backgroundColor: "green !important",
        maxWidth: "150px",
        width: "100%",
        display: "block",
      },
    },
    button: {
      whiteSpace: "nowrap",
    },
  },
  ".active": {
    color: "#fff !important",
  },
  ".headerButtons": {
    display: "flex",
    gap: "15px",
    width: "100%",
    flexDirection: "column",
    [theme.breakpoints.down(991)]: {
      maxWidth: "275px",
      marginRight: "auto",
    },

    ".btns": {
      padding: "0 10px",
      textTransform: "capitalize",
      height: "40px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      letterSpacing: "0.28px",
      color: "#fff", // Reference the CSS variable
      cursor: "pointer",
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
        background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
        conic-gradient(
          from 180deg at 50% 50%,
          #ff98e2,
          #ffc876 35.77deg,
          #79fff7 153.75deg,
          #9f53ff 258.75deg,
          #ff98e2 360deg
        ) border-box`,
      },
      svg: {
        marginLeft: "5px",
        path: {
          stroke: "#fff",
        },
      },
    },
    ".dropdown": {
      "& ul": {
        background: "green !important", // Corrected syntax for nested selectors
      },
    },
  },
}));

export const Descktop = styled(Box)(({ theme }) => ({
  position: "sticky",
  width: "100%",
  top: 0,
  zIndex: 1000,
  ".headerWrapper": {
    backgroundColor: "#121212",
  },
  ".header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 20px",
    backgroundColor: "#121212",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "1440px",
    width: "100%",
    margin: "auto",
    [theme.breakpoints.down(991)]: {
      display: "none",
    },
  },
  " .logo": {
    // width: "120px",
  },
  ".headerLinks": {
    ul: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
    li: {
      display: "flex",
      margin: "0 15px",
      display: "flex",
      gap: "40px",
      [theme.breakpoints.down(1366)]: {
        gap: "20px",
      },
      [theme.breakpoints.down(1199)]: {
        gap: "12px",
      },
    },

    ".link": {
      textDecoration: "none",
      color: "#A0A0A0",
      fontSize: "16px",
      fontWeight: "700",
      textTransform: "capitalize",
      padding: 0,
      whiteSpace: "nowrap",
      ".link.active": {
        color: "#007bff" /* Example color for active link */,
        fontWeight: "bold",
      },
    },
    ".switchApp button": {
      color: "#a0a0a0",
      fontSize: "15px",
      fontWeight: 700,
      textTransform: "capitalize",
      padding: 0,
      " .MuiPaper-root .css-o821ap-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
        backgroundColor: "green !important",
        maxWidth: "150px",
        width: "100%",
        display: "block",
      },
    },
    button: {
      whiteSpace: "nowrap",
    },
  },
  ".active": {
    color: "#fff !important",
  },
  ".headerButtons": {
    display: "flex",
    gap: "10px",
    ".btns": {
      padding: "0 15px",
      textTransform: "capitalize",
      height: "40px",
      fontStyle: "normal",
      whiteSpace: "nowrap",
      fontWeight: 700,
      lineHeight: "normal",
      letterSpacing: "0.28px",
      color: "#fff",
      cursor: "pointer",
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
        background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
        conic-gradient(
          from 180deg at 50% 50%,
          #ff98e2,
          #ffc876 35.77deg,
          #79fff7 153.75deg,
          #9f53ff 258.75deg,
          #ff98e2 360deg
        ) border-box`,
      },
      svg: {
        marginLeft: "5px",
        path: {
          stroke: "#fff",
        },
      },
    },
  },
}));
