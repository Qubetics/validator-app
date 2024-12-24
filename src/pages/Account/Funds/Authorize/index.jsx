/*eslint-disable */
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import FormWrapper from "../../../../components/Common/FormWrapper";
import Address from "../../../../components/Common/Address";
import TextField from "../../../../components/Common/TextField";
import { getAddress } from "../../../../services/getAddress";
import useStyles from "./style";
import Loader from "../../../../components/Loader/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "../../../../components/Common/Toast/Toast";
import CommonBtn from "../../../../components/Common/Commonbtn/Commonbtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import unBondFunds from "../../../../services/unBondFunds";
import getTransactionLogs from "../../../../services/apis/checkTransactionLogs";
import BackButton from "../../../../components/BackButton/BackButton";
import { isTxOccur } from "../../../../redux/reducer/auth";
import unJailValidator from "../../../../services/unjailValidator";
import stopDeactivating from "../../../../services/stopDeactivating";
import { BackIcon, MnemonicsIcon } from "../../../../assets/Icons/SvgIcon";

const AuthorizeTransaction = () => {
  const classes = useStyles();
  const [mnemonics, setMnemonics] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();
  const { userAddress, valoperAddress, bondedBalance } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [errMsg, setErrMsg] = useState({
    amount: "",
    mnemonics: "",
  });
  const { state } = useLocation();

  const onSubmit = async () => {
    try {
      let res = await getAddress(mnemonics);
      if (res?.message) {
        return toast.error(res?.message);
      }
      if (res?.length > 0 && res !== userAddress) {
        toast.error("Mnemonics are not same as login");
        return;
      }
      if (pathname.split("funds/")[1] == "stopvalidator") {
        setIsLoading(true);
        const response = await unBondFunds(mnemonics, userAddress, valoperAddress, bondedBalance?.bondedAmount);
        dispatch(isTxOccur(true));
        if (response?.length > 0) {
          setTimeout(() => {
            const fetchData = async () => {
              let resp = await getTransactionLogs(response);
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
          }, 1500);
        }
      } else if (pathname.split("funds/")[1] == "revalidation") {
        setIsLoading(true);
        const response = await unJailValidator(mnemonics, valoperAddress);
        dispatch(isTxOccur(true));
        if (response?.code == 0) {
          setIsLoading(false);
          navigate("/dashboard");
          toast.success("Transaction successful");
        } else {
          setIsLoading(false);
          navigate("/dashboard");
          toast.error(response?.rawLog);
        }
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split("Broadcasting transaction failed with code");
      toast.error(msg[1]);
    }
  };

  return (
    <FormWrapper className={classes.stopvalwrapper}>
      <div className="common-wrapper">
        <Typography className="common-wrapper__title common-wrapper__title--flex">
          <BackButton onClick={() => navigate(-1)} title={<BackIcon />} />

          <span>{pathname.split("funds/")[1] == "stopvalidator" ? "Stop Validator" : pathname.split("funds/")[1] == "revalidation" ? "Restart Validator " : pathname.split("funds/")[1] == "stop-deactivating" ? "Stop Decativation" : ""}</span>
        </Typography>
        <label>Wallet Address</label>
        <Address address={userAddress} />
        <div className="mnemonicsItems">
          <div style={{ marginBottom: "30px" }}>
            <TextField
              label="Enter Mnemonics to authorize the transaction"
              placeholder="Enter your mnemonics"
              onChange={(e) => {
                setMnemonics(e.target.value);
                if (e.target.value) {
                  setShowBtn(false);
                } else {
                  setShowBtn(true);
                }
              }}
              type="password"
              autoComplete="off"
            />
            {errMsg?.mnemonics?.length > 0 && <p style={{ color: "red", marginTop: "-7px" }}>{errMsg?.mnemonics}</p>}
          </div>
          <span className="maxBtn">
            <MnemonicsIcon />
          </span>
        </div>

        <h6>
          NOTE: <span className="noteData">Your account status may take some time to update.</span>
        </h6>
        {/* <Button
          fullWidth
          onClick={onSubmit}
          variant="contained"
          sx={{
            marginTop: "30px",
          }}
          disabled={showBtn}
        >
          Sign and submit
        </Button> */}
        <CommonBtn children="Sign and Submit" onClick={onSubmit} color="primary" />
      </div>
      {isLoading ? <Loader /> : null}
    </FormWrapper>
  );
};

export default AuthorizeTransaction;
