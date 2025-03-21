/*eslint-disable */
import Card from "../../Common/Card";
import { Container } from "./styles";
import { useSelector } from "react-redux";
import BlocksIcon from "../../../assets/Icons/BlocksIcon";
import ValidatorsNewIcon from "../../../assets/Icons/ValidatorsNewIcon";
import getDashboardWidgets from "../../../services/apis/getDashboardWidgets";
import { useEffect, useState } from "react";
import { noExponential } from "../../../utils/commonFunctions";
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
      // tooltipContent:
      //   "Block number of the last block proposed by the validator.",
      data: widgets?.lastBlockProposed ? widgets?.lastBlockProposed : "0",
    },
    {
      title: "No. of Delegators",
      icon: <ValidatorsNewIcon />,
      // tooltipContent: "Number of delegators who are delegating this validator",
      data: widgets?.delegatorCount ? widgets?.delegatorCount : "0",
    },
    {
      title: "Total Delegators Stake Amount",
      icon: <DelegatorStake />,
      // tooltipContent: "Total amount staked by the delegators who are delegating this validator",
      data: widgets?.delegatorStake
        ? noExponential(toFixed(widgets?.delegatorStake / 10 ** 18, 6)) +
          " " +
          "TICS"
        : "0",
    },
    {
      title: "Total Rewards",
      icon: <TotalReward />,
      // tooltipContent: "Amount of total rewards earned by the validator",
      data: widgets?.totalRewards ? (
        <span title={widgets?.totalRewards}>
          {" "}
          {noExponential(toFixed(widgets?.totalRewards, 6))}
        </span>
      ) : (
        "0"
      ),
    },
    {
      title: "No. of Blocks Proposed",
      icon: <BlockProposed />,
      // tooltipContent: "Blocks that are validated by a validator in an ongoing session",
      data: widgets?.totalBlockProposed ? widgets?.totalBlockProposed : "0",
    },
    {
      title: "Self Stake",
      icon: <SelfStake />,
      data: widgets?.selfStake
        ? noExponential(toFixed(widgets?.selfStake / 10 ** 18, 6)) +
          " " +
          "TICS"
        : "0",
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
