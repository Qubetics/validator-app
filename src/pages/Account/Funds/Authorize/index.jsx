/*eslint-disable */
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
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
import { keplrUnbond } from "../../../../keplrEvents/keplrUnbond";
import { checkTransaction } from "../../../../services/checkTransaction";
import { keplrUnjail } from "../../../../keplrEvents/keplrUnjail";
import { showEVMAddress } from "../../../../services/showEVMAddress";

const AuthorizeTransaction = () => {
  const classes = useStyles();
  const [mnemonics, setMnemonics] = useState();
  const [evmAddress, setEvmAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();
  const { userAddress, valoperAddress, bondedBalance, walletType } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [errMsg, setErrMsg] = useState({
    amount: "",
  });
  let nodeUrl = localStorage.getItem("node") || "";

  const { state } = useLocation();

  const onSubmit = async () => {
    try {
      if (walletType === "noWallet") {
        if (!mnemonics?.trim()) {
          return toast.error("Enter Mnemonics");
        }
        const res = await getAddress(mnemonics);
        if (res !== userAddress && walletType == "noWallet") {
          return toast.error("Mnemonics are not same as login");
        }
      }
      if (pathname.split("funds/")[1] == "stopvalidator") {
        setIsLoading(true);
        const unBoundAmt = bondedBalance?.bondedAmount / 10 ** 18;
        const data = {
          userAddress,
          unBoundAmt,
          valoperAddress,
          nodeUrl,
        };

        if (walletType == "keplr") {
          await keplrUnbond(
            userAddress,
            unBoundAmt,
            valoperAddress,
            setIsLoading,
            navigate
          );
        }

        if (walletType == "noWallet") {
          const response = await unBondFunds(
            mnemonics,
            userAddress,
            valoperAddress,
            bondedBalance?.bondedAmount / 10 ** 18
          );
          if (response) {
            dispatch(isTxOccur(true));
            setTimeout(() => checkTransaction(response, navigate), 3000);
          }
          return;
        }

        if (window?.qubetics && walletType == "qubetics") {
          window.qubetics.sendRequest(
            "stopValidator",
            data,
            (error, response) => {
              if (response?.type == "error") {
                setIsLoading(false);
                toast.error(response?.data?.message || "Something went wrong");
                return;
              } else {
                dispatch(isTxOccur(true));
                if (response) {
                  dispatch(isTxOccur(true));
                  setTimeout(() => checkTransaction(response, navigate), 2000);
                }
                return;
              }
            }
          );
        }
      } else if (pathname.split("funds/")[1] == "revalidation") {
        setIsLoading(true);
        const data = {
          valoperAddress,
          nodeUrl,
        };
        if (window?.qubetics && walletType == "qubetics") {
          window.qubetics.sendRequest(
            "unJailValidator",
            data,
            (error, response) => {
              if (response?.type == "error") {
                setIsLoading(false);
                toast.error(response?.data?.message || "Something went wrong.");
                return;
              } else {
                dispatch(isTxOccur(true));
                if (response?.data == 0) {
                  setIsLoading(false);
                  navigate("/dashboard");
                  toast.success("Transaction successful");
                } else {
                  setIsLoading(false);
                  navigate("/dashboard");
                  toast.error(response?.rawLog);
                }
              }
            }
          );
        }
        if (walletType == "keplr") {
          keplrUnjail(valoperAddress, navigate, setIsLoading);
        }
        if (walletType == "noWallet") {
          const response = await unJailValidator(mnemonics, valoperAddress);
          if (response) {
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
        }
        // else {
        //   setIsLoading(false);
        //   navigate("/dashboard");
        //   toast.error(response?.rawLog);
        // }
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
      toast.error(msg[1]);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (userAddress) {
        const address = await showEVMAddress(userAddress);
        setEvmAddress(address);
      }
    };

    fetchAddress();
  }, [userAddress]);

  return (
    <FormWrapper className={classes.stopvalwrapper}>
      <div className="common-wrapper">
        <Typography className="common-wrapper__title common-wrapper__title--flex">
          <BackButton onClick={() => navigate(-1)} title={<BackIcon />} />

          <span>
            {pathname.split("funds/")[1] == "stopvalidator"
              ? "Stop Validator"
              : pathname.split("funds/")[1] == "revalidation"
              ? "Restart Validator "
              : pathname.split("funds/")[1] == "stop-deactivating"
              ? "Stop Decativation"
              : ""}
          </span>
        </Typography>
        <label>Wallet Address</label>
        <Address address={evmAddress ? evmAddress : userAddress} />

        {walletType == "noWallet" && (
          <div className="mnemonicsItems">
            <div>
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
              {errMsg?.mnemonics?.length > 0 && (
                <p style={{ color: "red", marginTop: "-1px" }}>
                  {errMsg?.mnemonics}
                </p>
              )}
            </div>
            <span className="maxBtn">{/* <MnemonicsIcon /> */}</span>
          </div>
        )}

        <h6 style={{ marginTop: "10px", paddingBottom: "20px" }}>
          NOTE:{" "}
          <span className="noteData">
            Your account status may take some time to update.
          </span>
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
        <CommonBtn
          children="Sign and Submit"
          onClick={onSubmit}
          color="primary"
        />
      </div>
      {isLoading ? <Loader /> : null}
    </FormWrapper>
  );
};

export default AuthorizeTransaction;
