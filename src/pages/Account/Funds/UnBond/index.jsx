/*eslint-disable*/
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import CommonBtn from "../../../../components/Common/Commonbtn/Commonbtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../../components/Common/TextField";
import { useNavigate } from "react-router-dom";
import { BondWrapper } from "../styles";
import BackButton from "../../../../components/BackButton/BackButton";
import Loader from "../../../../components/Loader/Loader";
import { countDecimal, removeZero } from "../../../../utils/helper";
import { bondMoreValidations } from "../../../../utils/validatorValidations";
import unBondFunds from "../../../../services/unBondFunds";
import getTransactionLogs from "../../../../services/apis/checkTransactionLogs";
import { getAddress } from "../../../../services/getAddress";
import { toast } from "../../../../components/Common/Toast/Toast";
import { toFixed } from "../../../../utils/toFixed";
import { isTxOccur } from "../../../../redux/reducer/auth";
import { JAIL_TIME } from "../../../../constant";
import { MnemonicsIcon, BackIcon } from "../../../../assets/Icons/SvgIcon.jsx";
import { keplrUnbond } from "../../../../keplrEvents/keplrUnbond.js";

const UnBond = () => {
  const navigate = useNavigate();
  const [unBoundAmt, setUnboundAmt] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const [errMsg, setErrMsg] = useState({
    amount: "",
  });
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let nodeUrl = localStorage.getItem("node") || "";

  const {
    userAddress,
    userBalance,
    valoperAddress,
    bondedBalance,
    walletType,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const data = {
        userAddress,
        unBoundAmt,
        valoperAddress,
        nodeUrl,
      };
      if (walletType == "keplr") {
        await keplrUnbond(userAddress, unBoundAmt, valoperAddress);
      }
      if (window?.qubetics) {
        window.qubetics.sendRequest("unBondFunds", data, (error, response) => {
          if (response?.type == "error") {
            setIsLoading(false);
            toast.error(response?.data?.message || "Something went wrong");
            return;
          } else {
            dispatch(isTxOccur(true));
            if (response) {
              setTimeout(() => {
                const fetchData = async () => {
                  let resp = await getTransactionLogs(response?.data);
                  if (resp?.result?.tx_result?.data === null) {
                    setIsLoading(false);
                    toast.error("Transaction failed");
                    navigate("/dashboard");
                  } else {
                    setIsLoading(false);
                    toast.success("Transaction successful");
                    navigate("/dashboard");
                  }
                };
                fetchData();
              }, 2000);
            }
          }
        });
      }
    } catch (err) {
      console.log(err, "ER");
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
      toast.error(msg[1]);
    }
  };

  const maxUnbond = async () => {
    setUnboundAmt(toFixed(bondedBalance?.bondedAmount, 7));
    if (Number(bondedBalance?.bondedAmount) > 0) {
      setUnboundAmt(toFixed(bondedBalance?.bondedAmount / 10 ** 18, 7));
    } else {
      setUnboundAmt(0);
    }
  };

  useEffect(() => {
    if (!unBoundAmt || errMsg?.amount?.length > 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, unBoundAmt]);

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Unbond_Amount") {
      if (
        !isNaN(Number(value)) &&
        value !== " " &&
        !value.includes("+") &&
        !value.includes("-") &&
        countDecimal(value) <= 18
      ) {
        bondMoreValidations(e, setErrMsg, bondedBalance?.bondedAmount);
        let val = removeZero(e.target.value);
        setUnboundAmt(val);
      }
    }
    if (name === "Mnemonics") {
      bondMoreValidations(e, setErrMsg);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <BondWrapper>
      <div className="bond-wrapper">
        <Typography className="bond-wrapper__title">
          <BackButton onClick={() => navigate(-1)} title={<BackIcon />} />
          Unbond Funds
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap="17px"
          mb="26px"
        >
          <Typography className="fundAvail">
            <span>Funds Available To Unbond:</span>{" "}
            {bondedBalance?.bondedAmount / 10 ** 18}
          </Typography>
        </Box>
        <div className="bond-wrapper__amount">
          {/* Enter Unbonding Amount */}
          <TextField
            label="Unbond amount"
            placeholder="Enter amount to unstake"
            name="Unbond_Amount"
            paddingRight={150}
            helperText={`Funds unbonded will be available for withdrawal after the completion of the Unbonding Period which is ${JAIL_TIME} minutes`}
            onChange={handleChange}
            autoComplete="off"
            value={unBoundAmt}
          />
          {errMsg?.amount?.length > 0 && (
            <p style={{ color: "red", marginTop: "-1px" }}>{errMsg?.amount}</p>
          )}
          {/* Button for getting available unbonding amount */}

          <Button variant="contained" className="maxBtn" onClick={maxUnbond}>
            Unbond All
          </Button>
        </div>
        {/* Enter Mnemonics  */}

        {/* Authorize Transactions */}
        {/* <Button style={{ marginTop: "50px" }} fullWidth variant="contained" onClick={onSubmit} disabled={isDisable}></Button> */}

        <CommonBtn
          children="Sign and Submit"
          onClick={onSubmit}
          color="primary"
        />
      </div>
    </BondWrapper>
  );
};

export default UnBond;
