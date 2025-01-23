import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ActionTable from "../Dashboard/ValidatorCard/ActionTable";

const WalletActivites = () => {
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    setShowAll(true);
  }, []);
  return (
    <div>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "700",
          paddingBottom: "10px",
          marginTop: "-3px",
          paddingBottom: "10px",
          paddingTop: "25px",
        }}
      >
        Wallet Activities
      </Typography>

      <ActionTable showAll={showAll} />
    </div>
  );
};

export default WalletActivites;
