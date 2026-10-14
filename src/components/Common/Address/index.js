/* eslint-disable */

import { Typography } from "@mui/material";
import { Wrapper } from "./styles";
import CopyIcon from "../../../assets/Icons/CopyIcon";
import { toast } from "../Toast/Toast";
import getData from "../../../utils/getData";

const Address = ({ variant, address, white, minmize, ...props }) => {
  let className = props.white ? "white" : "";

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address Copied");
  };

  return (
    <Wrapper {...props} className="addres-input">
      {minmize ? (
        <Typography className="address-text">{getData(address)}</Typography>
      ) : (
        <Typography className="address-text">{address}</Typography>
      )}
      <text onClick={copyAddress} className="copy-btn">
        <CopyIcon className={className} sx={{ fontSize: "22px" }} />
      </text>
    </Wrapper>
  );
};

export default Address;
