import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-between",
  width: "100%",
  // marginBottom: "40px",
  [theme.breakpoints.down(1300)]: {
    justifyContent: "flex-start",
  },
  h6: {
    color: "#A0A0A0",
    fontWeight: "300",
    paddingBottom: "8px",
  },
  [theme.breakpoints.down(1680)]: {
    ".MuiTypography-h4": {
      fontSize: "18px",
      wordBerak: "break-word",
    },
    ".MuiTypography-h6 ": {
      fontSize: "13px",
    },
  },
  [theme.breakpoints.down(1440)]: {
    gap: "15px",
  },

  ".icon-wrap": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    flexShrink: "0",
    ".MuiBox-root": {
      h6: {
        background: "red",
      },
    },
    svg: {
      // width: "25px",
      // height: "25px",
    },

    [theme.breakpoints.down(1680)]: {
      width: "45px",
      height: "45px",
    },
    "&.firstbg": {
      // background: "#FE6BBA33",
    },
    "&.secondbg": {
      // background: "#1AD59833",
      svg: {
        // height: "30px",
      },
    },
    " &.thirdbg": {
      // background: "#0090FF33",
    },
    "&.fourthbg": {
      // background: "#F3654A33",
    },
    "&.fifthbg": {
      // background: "#F9B95933",
    },

    "&.icon-large": {
      ".MuiSvgIcon-fontSizeMedium": {
        fontSize: "34px",
      },
    },
  },

  ".supply-wrap": {
    display: "flex",
  },

  ".total-supply": {
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: "auto",
  background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
  borderRadius: "14px",
  padding: "22px 21px",
  border: "1px solid hsla(0, 4.1%, 47.5%, 0.1)",
  flex: "1",
  [theme.breakpoints.down(1300)]: {
    flex: "unset",
    maxWidth: "23%",
    width: "100%",
  },
  [theme.breakpoints.down(1199)]: {
    maxWidth: "32%",
    width: "100%",
  },
  [theme.breakpoints.down(767)]: {
    maxWidth: "100%",
    width: "100%",
  },
  ".MuiSvgIcon-root": {
    fontSize: "20px",
    fill: "transparent",
    flexShrink: "0",
  },
  [theme.breakpoints.down(1680)]: {
    padding: "20px",

    ".MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
  [theme.breakpoints.down(767)]: {
    width: "100%",
    wordBreak: "break-word",
    minHeight: "128px",
    maxWidth: "100%",
  },
  [theme.breakpoints.down(575)]: {
    width: "100%",
    wordBreak: "break-word",
    minHeight: "120px",
    maxWidth: "100%",
  },
}));
