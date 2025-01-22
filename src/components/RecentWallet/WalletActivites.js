import { Typography } from "@mui/material";
import React from "react";
import ActionTable from "../Dashboard/ValidatorCard/ActionTable";

const WalletActivites = () => {
  return (
    <div>
      <Typography sx={{ fontSize: "20px", fontWeight: "700", paddingBottom: "10px", marginTop: "-3px" }}>Recent Wallet Activities</Typography>

      <ActionTable />
    </div>
  );
};

export default WalletActivites;
