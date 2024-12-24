/* eslint-disable */
import { Typography } from "@mui/material";
import { Wrapper } from "./styles";
import CopyIcon from "../../../assets/Icons/CopyIcon";
import { toast } from "../../../components/Common/Toast/Toast";

const Address = ({ variant, address, ...props }) => {
  const copiedAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address Copied");
  };

  return (
    <Wrapper {...props} className="addres-input">
      <Typography className="address-text">{address}</Typography>
      <text onClick={copiedAddress} className="copy-btn">
        <CopyIcon sx={{ fontSize: "17px" }} />
      </text>
    </Wrapper>
  );
};

export default Address;
