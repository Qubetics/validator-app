/* eslint-disable */

import { Typography } from "@mui/material";
import DashboardValidatorCard from "../../components/Dashboard/ValidatorCard";

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h3" mb={2.5} style={{ paddingTop: "20px", marginBottom: "13px" }}>
        Dashboard
      </Typography>
      <DashboardValidatorCard />
    </div>
  );
};

export default Dashboard;
