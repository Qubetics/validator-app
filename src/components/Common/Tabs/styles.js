import { Box, Tabs, Tab, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(1324)]: {
    width: "100%",
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  ".disabled": {
    cursor: "not-allowed",
  },
  minHeight: "fit-content",
  "& .MuiTabs-scroller": {
    "& .MuiTabs-flexContainer": {
      minWidth: 428,
      gap: "20px",
      [theme.breakpoints.down(991)]: {
        gap: "10px",
      },
      ".MuiButtonBase-root": {
        background: "#121212",
        borderRadius: "28px",
        fontWeight: "500",
        color: "#A0A0A0",
        fontSize: "16px",
      },
      ".Mui-selected": {
        fontWeight: "500",
        border: "2px solid transparent",
        fontSize: "16px",
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
          opacity: "0.8",
        },
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.blue.main,
      display: "none",
    },
    [theme.breakpoints.down(664)]: {
      overflow: "auto !important",
      "& .MuiTabs-indicator": {
        background: "none",
      },
    },
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  ".disabled": {
    cursor: "not-allowed",
  },
  minWidth: "fit-content",
  minHeight: "fit-content",
  // margin: '0 106px 4px 0',
  padding: "7.5px 30px",
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
  letterSpacing: "normal",
  fontWeight: 500,
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: "24px",
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  "&:last-child": {
    marginRight: 0,
  },
  [theme.breakpoints.down(1400)]: {
    padding: "10px 25px",
  },
  // [theme.breakpoints.down(524)]: {
  //   margin: '0 20px 4px 0',
  // },
}));
