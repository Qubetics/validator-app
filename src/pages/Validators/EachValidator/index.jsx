/*eslint-disable*/
import { Paper, Skeleton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ValidatorDetailItem } from "./styles";
import { useEffect, useState } from "react";
import moment from "moment";
import Address from "./copiedAddress";
import { CURRENCY } from "../../../constant";
import BackButton from "../../../components/BackButton/BackButton";
import getValidatorByAddress from "../../../services/apis/getValidatorByAddress";
import Loader from "../../../components/Loader/Loader";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { noExponential } from "../../../utils/commonFunctions";
import { toFixed } from "../../../utils/toFixed";

const ValidatorDetails = () => {
  const params = useParams();
  const address = params?.address;
  const navigate = useNavigate();
  const [validatorDetail, setValidatorDetail] = useState({});
  const [detailStatus, setDetailStatus] = useState("Init");

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDetailStatus("Fetching");
        const response = await getValidatorByAddress(address);
        setValidatorDetail(response?.data?.validators[0]);
        setDetailStatus("Success");
      } catch (err) {
        setDetailStatus("Error");
        return err;
      }
    };
    fetchData();
  }, [address]);

  return (
    <>
      <Typography
        variant="h3"
        mb="20px"
        display={"flex"}
        justifyContent={"space-between"}
      >
        Validator Details
        <BackButton variant="contained" onClick={goBack}>
          Back
        </BackButton>
      </Typography>
      <>
        <div className="bond-wrapper">
          <Typography className="bond-wrapper__title bond-wrapper__title--flex validator-address">
            <Typography>Wallet Address:</Typography>
            {detailStatus === "Init" || detailStatus === "Fetching" ? (
              <Skeleton variant="text" width={300} height={25} />
            ) : (
              <Address address={validatorDetail?.validatorAddress} />
            )}
          </Typography>
        </div>
        <Paper>
          {detailStatus === "Init" || detailStatus === "Fetching" ? (
            // Skeleton Loaders for All Fields
            <>
              {Array.from({ length: 9 }).map((_, index) => (
                <ValidatorDetailItem key={index}>
                  <Typography color="text.secondary" variant="body2">
                    <Skeleton variant="text" width={150} height={25} />
                  </Typography>
                  <Typography>
                    <Skeleton variant="text" width={200} height={25} />
                  </Typography>
                </ValidatorDetailItem>
              ))}
            </>
          ) : (
            <>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  NAME
                </Typography>
                <Typography>
                  {validatorDetail?.name
                    ? capitalizeFirstLetter(validatorDetail?.name)
                    : "-"}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  STATUS
                </Typography>
                <Typography>
                  {validatorDetail?.status
                    ? capitalizeFirstLetter(validatorDetail?.status)
                    : "-"}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION RATE
                </Typography>
                <Typography>
                  {validatorDetail?.commissionRate
                    ? noExponential(toFixed(validatorDetail?.commissionRate, 4))
                    : 0}
                  %
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION MAX RATE
                </Typography>
                <Typography>
                  {validatorDetail?.commissionMaxRate
                    ? noExponential(
                        toFixed(validatorDetail?.commissionMaxRate, 4)
                      )
                    : 0}
                  %
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION CHANGE RATE
                </Typography>
                <Typography>
                  {validatorDetail?.commissionMaxChangeRate
                    ? noExponential(
                        toFixed(validatorDetail?.commissionMaxChangeRate, 4)
                      )
                    : 0}
                  %
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  TOTAL STAKE
                </Typography>
                <Typography>
                  {validatorDetail?.totalStake
                    ? noExponential(
                        Number(validatorDetail?.totalStake) / 10 ** 18
                      )
                    : "0"}{" "}
                  {CURRENCY}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  SELF STAKE
                </Typography>
                <Typography>
                  {validatorDetail?.selfStake
                    ? noExponential(
                        Number(validatorDetail?.selfStake) / 10 ** 18
                      )
                    : "0"}{" "}
                  {CURRENCY}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  VALIDATOR SINCE
                </Typography>
                <Typography>
                  {validatorDetail?.createdAt
                    ? moment(validatorDetail?.createdAt).format("YYYY/MM/DD")
                    : "-"}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  DELEGATORS
                </Typography>
                <Typography>
                  {validatorDetail?.delegatorCount
                    ? validatorDetail?.delegatorCount
                    : "0"}
                </Typography>
              </ValidatorDetailItem>
            </>
          )}
        </Paper>
      </>
      )
    </>
  );
};

export default ValidatorDetails;
