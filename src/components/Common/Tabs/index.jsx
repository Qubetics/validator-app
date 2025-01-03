/*eslint-disable*/
import { useSelector } from "react-redux";
import { StyledBox, StyledTabs, StyledTab } from "./styles";

function a11yProps(index) {
  return {
    id: `common-tab-${index}`,
    "aria-controls": `common-tabpanel-${index}`,
  };
}

const Tabs = ({ tabId, toggleTabHandler, isDisable }) => {
  const data = useSelector((state) => state?.auth);

  const handleChange = (event, newValue) => {
    if (!isDisable) {
      toggleTabHandler(newValue);
    }
  };

  console.log(data, "DATADAA");

  return (
    <StyledBox>
      <StyledTabs value={tabId} onChange={handleChange} aria-label="common tabs">
        <StyledTab className={isDisable ? "disabled" : ""} label={`All Validators (${data?.validatorCount?.count})`} {...a11yProps(0)} />
        <StyledTab className={isDisable ? "disabled" : ""} label={`Active (${data?.validatorCount?.activeCount})`} {...a11yProps(1)} />
        <StyledTab className={isDisable ? "disabled" : ""} label={`Inactive (${data?.validatorCount?.inactiveCount})`} {...a11yProps(2)} />
        <StyledTab className={isDisable ? "disabled" : ""} label={`Deactivating (${data?.validatorCount?.deactivatingCount})`} {...a11yProps(3)} />
      </StyledTabs>
    </StyledBox>
  );
};

export default Tabs;
