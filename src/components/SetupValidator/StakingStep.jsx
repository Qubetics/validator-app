/*eslint-disable*/
import { useState } from "react";
import { Button, Typography, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../Common/TextField";
import FormWrapper from "../Common/FormWrapper";
import BackButton from "../BackButton/BackButton";
import CommonBtn from "../Common/Commonbtn/Commonbtn.jsx";
import { BackIcon } from "../../assets/Icons/SvgIcon.jsx";
import "./style.css";
import { FEE, MIN_BOND_AMOUNT, commissionInputValues } from "../../constant";
import { countDecimal, removeZero } from "../../utils/helper";
import { handleNext } from "../../utils/validatorValidations";
import { toFixed } from "../../utils/toFixed";
import { noExponential } from "../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import { useGetNodeUrl } from "../../context/NodeUrl";
import Loader from "../Loader/Loader";
import { isTxOccur } from "../../redux/reducer/auth";
import { toast } from "../Common/Toast/Toast";
import { keplrCreateValidator } from "../../keplrEvents/keplrCreateValidator";

const mb20 = {
  marginBottom: "20px",
};

const StakingStep = ({
  activeStep,
  setActiveStep,
  setSecondaryValues,
  secondaryValues,
  methodType,
  primaryValues,
}) => {
  const { userBalance, valoperAddress, walletType, userAddress } = useSelector(
    (state) => state.auth
  );
  const { valoperAddressFromBlockChain } = useSelector((state) => state?.auth);
  let publicKey = localStorage.getItem("publicKey") || "";

  const { nodeUrl } = useGetNodeUrl();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAmount = (e) => {
    e.persist();
    const { name, value } = e.target;
    if (
      !isNaN(Number(value)) &&
      value !== " " &&
      !value.includes("+") &&
      !value.includes("-") &&
      countDecimal(value) <= 18
    ) {
      setSecondaryValues((prevValue) => ({
        ...prevValue,
        [name]: removeZero(e.target.value), // Use e.target.value directly
      }));
    }
  };

  const handleMaxAmt = () => {
    if (
      Number(userBalance) > 0 &&
      Number(userBalance) > Number(FEE) &&
      Number(userBalance) >= Number(MIN_BOND_AMOUNT) + Number(FEE)
    ) {
      let remianingAmt = Number(userBalance) - Number(FEE);
      setSecondaryValues((prevValue) => ({
        ...prevValue,
        Bond_Amount: noExponential(toFixed(remianingAmt, 7)),
      }));
    } else {
      setSecondaryValues((prevValue) => ({ ...prevValue, Bond_Amount: 0 }));
    }
  };

  const handleNextValidate = () => {
    const res = handleNext(
      secondaryValues,
      activeStep,
      setActiveStep,
      userBalance,
      FEE
    );
    const data = {
      primaryValues,
      secondaryValues,
      nodeUrl,
      valoperAddressFromBlockChain,
      publicKey,
    };

    console.log(valoperAddressFromBlockChain, "VALOPER ADDRES");

    if (walletType == "keplr") {
      keplrCreateValidator(
        primaryValues?.details,
        secondaryValues?.Commission_Rate,
        secondaryValues?.Bond_Amount,
        valoperAddress,
        userAddress,
        publicKey
      );
    }
    return;
    setLoader(true);
    if (window?.qubetics && res) {
      window.qubetics.sendRequest("createValidator", data, (error, res) => {
        if (res?.type == "error") {
          setLoader(false);
          toast.error(res?.data?.message || "Something went wrong");
          return;
        } else {
          setTimeout(() => {
            dispatch(isTxOccur(true));
            if (res?.data?.code == 0) {
              setLoader(false);
              navigate("/dashboard");
              toast.success("Transaction Successful");
              return;
            } else {
              if (res && res?.data?.rawLog?.includes("failed")) {
                let msg = res?.data?.rawLog?.split(
                  "failed to execute message; message index: 0:"
                );
                toast.error(msg[1]);
              } else {
                toast.error(res?.data?.rawLog);
              }
              setLoader(false);
              return navigate("/dashboard");
            }
          }, 3000);
        }
      });
    } else {
      setLoader(false);
    }
  };

  return (
    <FormWrapper>
      <div className="common-wrapper" style={{ marginTop: "20px" }}>
        <BackButton onClick={() => navigate(-1)} title={<BackIcon />} />
        <Typography
          whiteSpace="nowrap"
          className="common-wrapper__title common-wrapper__title--flex"
        >
          Setup as a validator
        </Typography>
        <Typography whiteSpace="nowrap" className="common-wrapper__subText">
          Staking
        </Typography>
        <div
          className="common-wrapper__amount"
          style={{ paddingBottom: "6px" }}
        >
          <TextField
            label="Stake/Bond amount"
            helperText={`Minimum wallet balance for staking should be min required bond amount + fee, which is ${
              Number(MIN_BOND_AMOUNT) + Number(FEE)
            }`}
            placeholder="Enter stake amount for the validator bond"
            onChange={handleAmount}
            name="Bond_Amount"
            value={secondaryValues?.Bond_Amount}
            type="text"
            autoComplete="off"
          />
          {/*
          <Button variant="outlined" className="maxBtn" onClick={handleMaxAmt}>
            Max
          </Button>
        */}
        </div>
        <Typography paddingTop="0" variant="h5">
          Commission (%)
        </Typography>
        {commissionInputValues?.map((item) => (
          <div className="stakingInputs">
            <p className="labelTexts">{item?.label}</p>
            <TextField
              className="setup_inputTexts"
              key={item?.id}
              placeholder={item?.label}
              helperText={item?.helperText}
              name={item?.name}
              value={secondaryValues[item?.name]}
              onChange={(e) => handleAmount(e)}
              type="text"
              autoComplete="off"
            />
          </div>
        ))}
        <div className="commonBtns">
          <CommonBtn
            children=" Bond and validate"
            onClick={() => handleNextValidate()}
            // onClick={() =>
            //   handleNext(
            //     secondaryValues,
            //     activeStep,
            //     setActiveStep,
            //     userBalance,
            //     FEE
            //   )
            // }
            color="primary"
          />
        </div>
      </div>
      {loader && <Loader />}
    </FormWrapper>
  );
};

export default StakingStep;
