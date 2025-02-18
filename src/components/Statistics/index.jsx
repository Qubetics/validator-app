/*eslint-disable*/
import { useEffect, useState } from "react";
import { Box, Typography, Tooltip, IconButton, Skeleton } from "@mui/material";
import { Wrapper, StatItem } from "./styles";
import MarketCapIcon from "../../assets/Icons/MarketCapIcon";
import PriceIcon from "../../assets/Icons/PriceIcon";
import InflationIcon from "../../assets/Icons/InflationIcon";
import SupplyIcon from "../../assets/Icons/SupplyIcon";
import InfoIcon from "../../assets/Icons/InfoIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import { getApy, getTotalValidators } from "../../redux/reducer/auth";
import { useDispatch } from "react-redux";
import { APP_NAME, CURRENCY } from "../../constant";
import getAllStats from "../../services/apis/getStatistics";
import Loader from "../Loader/Loader";
import { toFixed } from "../../utils/toFixed";
import { formatMillionNumber } from "../../utils/commonFunctions";
import getQubeticsPrice from "../../services/getQubeticsPrice";

const Statistics = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({});
  const [statsStatus, setStatsStatus] = useState("Init");
  const [price, setPrice] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatsStatus("Fetching");
        let response = await getAllStats();
        setStats(response?.data);
        dispatch(getApy(response?.data?.apy));
        dispatch(getTotalValidators(response?.data?.totalValidator));
        setStatsStatus("Success");
      } catch (err) {
        setStatsStatus("Error");
        return err;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    try {
      let response = await getQubeticsPrice();
      setPrice(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <StatItem>
        <div className="icon-wrap fourthbg">
          <MarketCapIcon />
        </div>
        <Box ml="10px">
          <Typography variant="h6" color="text.secondary">
            Market Cap
            <Tooltip
              className="tooltip-common"
              placement="top"
              arrow
              title={
                <Typography variant="h6" padding={1}>
                  Total value of all the coins issued
                </Typography>
              }
            >
              <IconButton>{<InfoIcon />}</IconButton>
            </Tooltip>
          </Typography>
          <div className="supply-wrap">
            <Typography variant="h3" title={stats?.marketCap}>
              {statsStatus === "Init" || statsStatus === "Fetching" ? (
                <Skeleton variant="circle" width={100} height={20} />
              ) : (
                <>
                  $
                  {stats?.marketCap
                    ? formatMillionNumber(Number(stats?.marketCap))
                    : 0}
                </>
              )}
            </Typography>
          </div>
        </Box>
      </StatItem>

      <StatItem>
        <div className="icon-wrap secondbg icon-large">
          <PriceIcon />
        </div>

        <Box ml="10px">
          <Typography variant="h6" color="text.secondary">
            {/* {APP_NAME}  */}
            Qubetics Price
            <Tooltip
              className="tooltip-common"
              placement="top"
              arrow
              title={
                <Typography variant="h6" padding={1}>
                  The current market price of {APP_NAME} coin in USD.
                </Typography>
              }
            >
              <IconButton>{<InfoIcon />}</IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="h3" title={stats?.tokenPrice}>
            {statsStatus === "Init" || statsStatus === "Fetching" ? (
              <Skeleton variant="circle" width={100} height={20} />
            ) : (
              <>$ {price ? toFixed(Number(price), 6) : "0"}</>
            )}
          </Typography>
        </Box>
      </StatItem>
      <StatItem>
        <div className="icon-wrap thirdbg icon-large">
          <InflationIcon />
        </div>
        <Box ml="10px">
          <Typography variant="h6" color="text.secondary">
            Inflation
            <Tooltip
              className="tooltip-common"
              placement="top"
              arrow
              title={
                <Typography variant="h6" padding={1}>
                  This inflation rate is adjusted automatically by the protocol,
                  based on how much total stake is bonded by staking
                  participants.
                </Typography>
              }
            >
              <IconButton>{<InfoIcon />}</IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="h3">
            {statsStatus === "Init" || statsStatus === "Fetching" ? (
              <Skeleton variant="circle" width={100} height={20} />
            ) : (
              <>{stats?.inflation ? toFixed(stats?.inflation, 1) : 0}%</>
            )}
          </Typography>
        </Box>
      </StatItem>
      <StatItem>
        <div className="icon-wrap fourthbg">
          <CalendarIcon />
        </div>

        <Box ml="10px">
          <Typography variant="h6" color="text.secondary">
            APR
            <Tooltip
              className="tooltip-common"
              placement="top"
              arrow
              title={
                <Typography variant="h6" padding={1}>
                  The annual percentage yield in {CURRENCY} is calculated by
                  dividing the estimated yearly reward by the current {CURRENCY}{" "}
                  ({APP_NAME}'s native token) holding{" "}
                </Typography>
              }
            >
              <IconButton>{<InfoIcon />}</IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="h3">
            {statsStatus === "Init" || statsStatus === "Fetching" ? (
              <Skeleton variant="circle" width={100} height={20} />
            ) : (
              <>{stats?.apy ? toFixed(stats?.apy, 3) : 0}%</>
            )}
          </Typography>
        </Box>
      </StatItem>
      <StatItem>
        <div className="icon-wrap fifthbg">
          <SupplyIcon />
        </div>
        <Box ml="10px">
          <Typography variant="h6" color="text.secondary">
            Total Supply
            <Tooltip
              className="tooltip-common"
              placement="top"
              arrow
              title={
                <Typography variant="h6" padding={1}>
                  Total tokens issued by the system
                </Typography>
              }
            >
              <IconButton>{<InfoIcon />}</IconButton>
            </Tooltip>
          </Typography>
          <div className="supply-wrap" title={stats?.totalSupply}>
            <Typography variant="h3">
              {statsStatus === "Init" || statsStatus === "Fetching" ? (
                <Skeleton variant="circle" width={100} height={20} />
              ) : (
                <>
                  {stats?.totalSupply
                    ? formatMillionNumber(Number(stats?.totalSupply) / 10 ** 18)
                    : 0}{" "}
                </>
              )}
            </Typography>
          </div>
        </Box>
      </StatItem>
    </Wrapper>
  );
};

export default Statistics;
