import { styled, Box } from "@mui/material";

export const ValidatorDetailsHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "26px 50px 28px 23px",
  gap: "20px",
  flexWrap: "wrap",
});
export const ValidatorsCard = styled(Box)({
  h3: {
    padding: "20px 2px 13px",
    marginBottom: 0,
  },
});

export const ValidatorDetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  // justifyContent: "space-between",
  padding: "20px 20px 10px",
  background: "#121212",
  overflow: "hidden",
  ">:first-of-type": {
    fontWeight: 300,
    color: "#A0A0A0",
    width: "400px",
    fontSize: "14px",
    [theme.breakpoints.down(420)]: {
      width: "300px",
    },
  },
  [theme.breakpoints.down(410)]: {
    flexDirection: "column",
    gap: "20px",
  },
}));
export const WalletAdd = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  p: {
    dislay: "flex",
    flexDirection: "column",
    maxWidth: "440px",
    width: "100%",
    gap: "4px",
    alignItems: "flex-start",
  },
}));
export const ProfileDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  // justifyContent: 'space-between',
  padding: "10px 30px 10px 30px",
  // borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  "&:first-child": {
    borderTop: "0",
  },
  "p:first-child": {
    color: "#A0A0A0",
    fontSize: "16px",
    fontWeight: 300,
  },
  "p:last-child": {
    fontSize: "16px",
    fontWeight: "400",
  },

  ">:first-of-type": {
    fontWeight: 700,
    width: "408px",
  },
  [theme.breakpoints.down(410)]: {
    flexDirection: "column",
    gap: "20px",
    ">:first-of-type": {
      width: "100%", // Adjust the width for smaller screens
    },
  },
}));

export const Wrapper = styled("div")({
  background: "#121212",
  marginBottom: "20px",
  display: "flex",
  borderRadius: "8px",
  justifyContent: "space-between",
  padding: "12px 24px",
  alignItems: "center",
  width: "100%",
  // maxWidth: '215px',

  ".address-text": {
    fontSize: "16px",
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  ".copy-btn": {
    background: "transparent",
    border: "0",
    padding: "0",
    cursor: "pointer",
    marginLeft: "10px",
  },
});
export const ProfileSec = styled(Box)(({ theme }) => ({
  h3: {
    fontSize: "28px",
    fontWeight: 700,
  },
}));
