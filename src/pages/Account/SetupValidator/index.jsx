/* eslint-disable */
import { useState } from "react";
import AuthorizeValidatorTransaction from "../../../components/SetupValidator/AuthorizeStep";
import FirstStep from "../../../components/SetupValidator/FirstStep";
import StakingStep from "../../../components/SetupValidator/StakingStep";
import { useSelector } from "react-redux";

const SetupValidator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [primaryValues, setPrimaryValues] = useState({
    name: "",
    details: "",
    website: "",
    identity: "",
    SecurityContact: "",
  });
  const [secondaryValues, setSecondaryValues] = useState({
    Bond_Amount: "",
    Commission_Rate: "",
    Max_Rate: "",
    Max_Change_Rate: "",
  });

  return (
    <>
      {(() => {
        switch (activeStep) {
          case 0:
            return (
              <FirstStep
                primaryValues={primaryValues}
                setPrimaryValues={setPrimaryValues}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                methodType="createValidator"
              />
            );
          case 1:
            return (
              <StakingStep
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setSecondaryValues={setSecondaryValues}
                secondaryValues={secondaryValues}
                methodType="createValidator"
              />
            );
          case 2:
            return (
              <AuthorizeValidatorTransaction
                setActiveStep={setActiveStep}
                primaryValues={primaryValues}
                methodType="createValidator"
                secondaryValues={secondaryValues}
              />
            );
          default:
            return <></>;
        }
      })()}
    </>
  );
};

export default SetupValidator;
