/* eslint-disable */
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ValidatorTable from "./ValidatorTable";
import ActionTable from "./ActionTable";
import FlexBox from "../../../components/Common/FlexBox";
import { Container, ValidatorButton } from "./styles";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import BlockchainInfos from "../../../components/Dashboard/BlockchainInfos";
import {
  checkIfValidatorExist,
  getValoperAddress,
} from "../../../redux/reducer/auth";
import getValidatorByAddress from "../../../services/apis/getValidatorByAddress";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

const DashboardValidatorCard = () => {
  const navigate = useNavigate();
  const { userAddress, isValidated } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [dasboardData, setDashboardData] = useState([]);
  const [dashboardStatus, setDashboardStatus] = useState("Init");
  const [walletActivitesLength, setWalletActivitesLength] = useState(0);

  const setUpValidate = () => {
    navigate("/account/become-a-validator");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAddress) {
          setDashboardStatus("Fetching");
          const response = await getValidatorByAddress(userAddress);

          if (response?.error === false) {
            setDashboardData(response?.data?.validators[0]);
            dispatch(
              getValoperAddress(response?.data?.validators[0]?.operatorAddress)
            );
            dispatch(checkIfValidatorExist(true));
            setDashboardStatus("Success");
          } else {
            dispatch(checkIfValidatorExist(false));
            setDashboardStatus("Error");
          }
        }
      } catch (err) {
        setDashboardStatus("Error");
        dispatch(checkIfValidatorExist(false));
        return err;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container style={{ background: "transparent" }}>
        <section className="validator-status common-table">
          <div className="validator-status__card">
            <FlexBox>
              <Typography variant="h4">
                <span style={{ color: "#A0A0A0", fontWeight: "300" }}>
                  {" "}
                  Validator Status :
                </span>{" "}
                <span
                  style={{
                    fontWeight: "300",
                    color:
                      dasboardData?.status === "active"
                        ? "green"
                        : dasboardData?.status === "inactive"
                        ? "red"
                        : "inherit", // Default color for other statuses
                  }}
                >
                  {isValidated
                    ? capitalizeFirstLetter(dasboardData?.status)
                    : "-"}
                </span>
              </Typography>
            </FlexBox>
            {isValidated === false && (
              <ValidatorButton onClick={setUpValidate}>
                setup as a validator
              </ValidatorButton>
            )}
          </div>
          {isValidated === true && (
            <ValidatorTable dasboardData={dasboardData} />
          )}
        </section>
      </Container>
      <BlockchainInfos />
      <Container style={{ background: "transparent" }}>
        <div
          className="recentHeader"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            // paddingBottom: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              paddingBottom: "10px",
              marginTop: "-3px",
              marginTop: "-3px",
            }}
          >
            Recent Wallet Activities
          </Typography>
          {walletActivitesLength > 5 && (
            <button
              className="view-all viewAllBtn"
              onClick={() => navigate("/wallet-activites")}
            >
              View All
            </button>
          )}
        </div>

        <section className=" common-table" style={{ width: "100%" }}>
          {/* <div
            className="validator-status__card"
            style={{ paddingLeft: "0" }}
          ></div> */}

          <ActionTable setWalletActivitesLength={setWalletActivitesLength} />
        </section>
      </Container>
    </>
  );
};

export default DashboardValidatorCard;
