/*eslint-disable */
import { useSelector } from "react-redux";
import { Container } from "./styles";
import Card from "../../Common/Card";
import StakingIcon from "../../../assets/Icons/StakingIcon";
import { TotalValidatorIcon } from "../../../assets/Icons/SvgIcon.jsx";
import { toFixed } from "../../../utils/toFixed";
import { useEffect } from "react";

const ValidatorsInfo = () => {
  const { isSidebarOpen } = useSelector((state) => state?.drawer);
  const data = useSelector((state) => state?.auth);
  console.log(data, "DATTA");

  return (
    <Container isOpen={isSidebarOpen}>
      <Card
        icon={<TotalValidatorIcon />}
        title={"Total Validators"}
        value={data?.totalValidators ? data?.totalValidators : 0}
      />
      <Card
        icon={<StakingIcon />}
        title={"Staking APY"}
        value={data?.APY ? toFixed(data?.APY, 2) + "%" : 0}
      />
    </Container>
  );
};

export default ValidatorsInfo;
