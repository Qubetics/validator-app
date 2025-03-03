/*eslint-disable */
import {
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../../theme";
import {
  CURRENCY,
  JAIL_TIME,
  bondedTableHeader,
  reValidateMenuOptions,
  stopMenuOptions,
} from "../../../constant";
import InfoIcon from "../../../assets/Icons/InfoIcon";
import { noExponential } from "../../../utils/commonFunctions";
import "./style.css";
import { toFixed } from "../../../utils/toFixed";
import CommonModal from "../../CommonModal.jsx";
import { useEffect, useState } from "react";
import { isOptionDisableInMinutes } from "../../../utils/commissionEditTimer.jsx";
import CountdownTimer from "./CountDownTimer";

const BondTable = ({ bondedData }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  console.log(bondedData, "BONDED");
  let message =
    Number(bondedData?.selfStake) < 100 &&
    `Minimum required balance is 100 ${CURRENCY}`;

  console.log(bondedData?.unbondingTime, "UNBONDING TIME", shouldShow);

  useEffect(() => {
    if (bondedData?.unbondingTime) {
      let date = bondedData?.unbondingTime;
      if (
        isOptionDisableInMinutes(date, 30) ||
        Number(bondedData?.selfStake) < 100
      ) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
      setButtonClick(false);
    }
  }, [bondedData, buttonClick]);

  const handleButtonClick = () => {
    setButtonClick(true);
    if (shouldShow) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <CountdownTimer unbondingTime={bondedData?.unbondingTime} />
      <CommonModal open={open} setOpen={setOpen} message={message} />
      <div className="common-table Bondtable">
        <Typography
          className="account-card__title title"
          style={{ paddingTop: "30px" }}
        >
          Bond Details
        </Typography>
        <TableContainer
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <Table aria-label="simple table" className="bondTable">
            <TableHead>
              <TableRow>
                {bondedTableHeader?.map((item, index) => (
                  <TableCell key={index}>
                    <Typography
                      color="text.secondary"
                      fontSize="14px"
                      lineHeight="24px"
                    >
                      {item?.heading}
                      {item?.content && (
                        <Tooltip
                          className="tooltip-common"
                          placement="top"
                          arrow
                          title={
                            <Typography variant="h6" padding={1}>
                              {item?.content}
                            </Typography>
                          }
                        >
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    paddingLeft: isMobile ? "40px" : "80px",
                  }}
                >
                  <Typography variant="body2">
                    {bondedData?.selfStake
                      ? noExponential(
                          toFixed(Number(bondedData?.selfStake) / 10 ** 18, 4)
                        )
                      : "0"}{" "}
                    {CURRENCY}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {bondedData?.unbondingAmount
                      ? noExponential(toFixed(bondedData?.unbondingAmount, 4))
                      : "0"}{" "}
                    {CURRENCY}
                  </Typography>
                </TableCell>
                {bondedData?.status == "active" ||
                bondedData?.status == "deactivating" ? (
                  <TableCell>
                    {stopMenuOptions?.map((option) => (
                      <div
                        className={
                          bondedData?.status !== "deactivating"
                            ? "notDiabled"
                            : "disabledlinks"
                        }
                      >
                        <Link
                          to={option.path}
                          className={`bonds-btns ${option.style}`}
                          key={option?.path}
                        >
                          <Typography variant="body3">
                            {option?.label}
                          </Typography>
                        </Link>
                      </div>
                    ))}
                  </TableCell>
                ) : bondedData?.status == "inactive" ? (
                  <TableCell>
                    <div
                      className={
                        bondedData?.status !== "deactivating"
                          ? "notDiabled"
                          : "notDiabled"
                      }
                    >
                      <Link
                        to="/account/funds/bond"
                        className={`bonds-btns btn-blue`}
                        key="/account/funds/bond"
                      >
                        <Typography variant="body3">Bond more funds</Typography>
                      </Link>
                      <Link
                        to={
                          shouldShow == false
                            ? "/account/funds/revalidation"
                            : "#"
                        }
                        className={`bonds-btns btn-red`}
                        onClick={() => handleButtonClick()}
                        key="/account/funds/revalidation"
                      >
                        <Typography variant="body3">Re-Validate</Typography>
                      </Link>
                    </div>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BondTable;
