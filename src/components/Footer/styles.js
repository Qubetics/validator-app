import { styled } from "@mui/system";
import { Box } from "@mui/material";

// export const FooterContainer = styled(Box)(({ theme }) => ({
//
//   color: "#FFFFFF",
//   padding: "40px 20px",
//   position: "relative",
//   [theme.breakpoints.down("sm")]: {
//     padding: "20px 10px",
//   },
// }));
export const FooterItem = styled(Box)(({ theme }) => ({
  background: "linear-gradient(180deg, rgba(13, 13, 13, 0) -43.17%, #0D0D0D 100%)",
  padding: "0 20px",
  marginTop: "100px",
  [theme.breakpoints.down(991)]: {
    padding: "0 10px",
    marginTop: "10px",
  },
}));
export const FooterItemInner = styled(Box)(({ theme }) => ({
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "40px 20px 26px 20px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 10px 0px 0",
  },
}));
export const FooterSection = styled(Box)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
  "& h6": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: "15px",
    whiteSpace: "noWrap",
  },
  "& a": {
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    display: "block",
    paddingBottom: "1px",
    textDecoration: "none",
    transition: " transform .3s ease, color .3s ease, background-color .3s ease",
    "&:hover": {
      // textDecoration: "underline",
      transform: "translateX(10px)",
    },
  },
  "& p": {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    maxWidth: "358px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
}));

export const SocialLinks = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  "& h6": {
    textAlign: "center",
    fontWeight: "700",
    paddingTop: "90px",
    paddingBottom: "7px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10px",
    },
  },
}));

export const SocialLinksInner = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  paddingBottom: "42px",

  "& a": {
    color: "#FFFFFF",
    fontSize: "24px",
    textDecoration: "none",
    cursor: "pointer",
  },
}));

export const Copyright = styled(Box)(({ theme }) => ({
  paddingTop: "18px",
  textAlign: "center",
  fontSize: "14px",
  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "20px",
  },
}));
