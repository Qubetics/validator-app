/*eslint-disable */
import Card from "../../Common/Card";
import { Container } from "./styles";
import { useSelector } from "react-redux";
import BlocksIcon from "../../../assets/Icons/BlocksIcon";
import ValidatorsNewIcon from "../../../assets/Icons/ValidatorsNewIcon";
import getDashboardWidgets from "../../../services/apis/getDashboardWidgets";
import { useEffect, useState } from "react";
import {
  formatMillionNumber,
  noExponential,
} from "../../../utils/commonFunctions";
import {
  DelegatorStake,
  TotalReward,
  BlockProposed,
  SelfStake,
  BlockIcon,
} from "../../../assets/Icons/SvgIcon.jsx";
import { toFixed } from "../../../utils/toFixed";
import { CURRENCY } from "../../../constant";

const BlockchainInfos = () => {
  const { userAddress } = useSelector((state) => state.auth);
  const [widgets, setWidgets] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userAddress) {
          const response = await getDashboardWidgets(userAddress);
          setLoading(false);
          setWidgets(response?.data);
        }
      } catch (err) {
        setLoading(false);
        return err;
      }
    };
    fetchData();
  }, [userAddress]);

  const titles = [
    {
      title: "Last Block Proposed",
      icon: <BlockIcon />,
      data: widgets?.lastBlockProposed ? (
        <span title={widgets?.lastBlockProposed} style={{ cursor: "pointer" }}>
          {formatMillionNumber(widgets?.lastBlockProposed)}
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "No. of Delegators",
      icon: <ValidatorsNewIcon />,
      data: widgets?.delegatorCount ? (
        <span title={widgets?.delegatorCount} style={{ cursor: "pointer" }}>
          {widgets?.delegatorCount}
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "Total Delegators Stake Amount",
      icon: <DelegatorStake />,
      data: widgets?.delegatorStake ? (
        <span
          title={noExponential(widgets?.delegatorStake / 10 ** 18)}
          style={{ cursor: "pointer" }}
        >
          {formatMillionNumber(
            noExponential(widgets?.delegatorStake / 10 ** 18)
          )}{" "}
          TICS
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "Total Rewards",
      icon: <TotalReward />,
      data: widgets?.totalRewards ? (
        <span
          title={noExponential(widgets?.totalRewards)}
          style={{ cursor: "pointer" }}
        >
          {formatMillionNumber(noExponential(widgets?.totalRewards))}
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "No. of Blocks Proposed",
      icon: <BlockProposed />,
      data: widgets?.totalBlockProposed ? (
        <span title={widgets?.totalBlockProposed} style={{ cursor: "pointer" }}>
          {formatMillionNumber(widgets?.totalBlockProposed)}
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "Self Stake",
      icon: <SelfStake />,
      data: widgets?.selfStake ? (
        <span
          title={noExponential(widgets?.selfStake / 10 ** 18)}
          style={{ cursor: "pointer" }}
        >
          {formatMillionNumber(noExponential(widgets?.selfStake / 10 ** 18))}{" "}
          TICS
        </span>
      ) : (
        "0"
      ),
    },
  ];

  return (
    <Container>
      {titles?.map((item) => (
        <Card
          key={item?.title}
          title={item?.title}
          icon={item?.icon}
          tooltipContent={item?.tooltipContent}
          value={item?.data}
          loading={loading}
        />
      ))}
    </Container>
  );
};

export default BlockchainInfos;
