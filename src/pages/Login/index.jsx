/* eslint-disable */

import { Button, Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CommonBtn from "../../components/Common/Commonbtn/Commonbtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/Common/TextField";
import InfoIcon from "../../assets/Icons/InfoIcon.jsx";
import LoginIcon from "../../assets/Icons/LoginIcon";
import {
  getValoperAddressFromBlockChain,
  logInSuccess,
  getEvmAddress,
} from "../../redux/reducer/auth";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { toast } from "../../components/Common/Toast/Toast";
import { getAddress } from "../../services/getAddress";
import { NodeBox } from "./styles";
import fetchValoperAddress from "../../services/fetchValoperAddress";
import getLatestBlocks from "../../services/getLatestBlocks";
import theme from "../../theme";

import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";
import BackButton from "../../components/BackButton/BackButton.js";
import { BackIcon } from "../../assets/Icons/SvgIcon.jsx";
import { checkNodeStatus } from "../../services/checkValidUrl.js";
import Loader from "../../components/Loader/Loader.js";
import { userEvmAddress } from "../../services/userEvmAddress.js";
const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, SetMnemonics] = useState("");
  const { isLoggedIn, userAddress, isTx } = useSelector((state) => state.auth);
  const changeHandler = (e) => SetMnemonics(e.target.value?.trim());
  const { nodeUrl, setNodeUrl, isNodeAdded, setIsNodeAdded } = useGetNodeUrl();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!mnemonics) {
        toast.error("Mnemonics is required!");
        return;
      }
      if (mnemonics?.length > 0) {
        setIsLoading(true);
        let res = await getAddress(mnemonics);
        let evmAddress = await userEvmAddress(mnemonics);

        if (res?.message) {
          toast.error(`Invalid node, ${res?.message}`);
          return;
        }
        let block = await getLatestBlocks();
        let block1 = await getBlockFromChain();
        if (block?.result?.block?.header?.height && block1?.data?.blocknumber) {
          if (
            block?.result?.block?.header?.height == block1?.data?.blocknumber
          ) {
            let response = await fetchValoperAddress(mnemonics);
            dispatch(getValoperAddressFromBlockChain(response));
            dispatch(getEvmAddress(evmAddress));
            dispatch(logInSuccess(res));

            setIsLoading(false);
            return toast.success("Logged In Successfully");
          } else {
            setIsLoading(false);

            return toast.error(
              `Either check your node connection or node is not synced,current syncing status: ${block?.result?.block?.header?.height} out of ${block1?.data?.blocknumber}`
            );
          }
        }
      }
    } catch (err) {
      toast.error(err?.message, "check your node");
    }
  };

  const handleNode = async () => {
    if (
      nodeUrl.includes("ws://") ||
      nodeUrl.includes("https://") ||
      nodeUrl.includes("http://") ||
      nodeUrl.includes("wss://")
    ) {
      const checkNodeUrl = await checkNodeStatus(nodeUrl);
      if (checkNodeUrl) {
        localStorage.setItem("node", nodeUrl);
        setIsNodeAdded(true);
      } else {
        toast.error("Invalid Url");
      }
    } else {
      toast.error("Invalid URL");
    }
  };
  const handleNodeChange = (e) => {
    setNodeUrl(e.target.value);
    setIsNodeAdded(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && nodeUrl) {
        handleNode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [nodeUrl]);

  return (
    <>
      <div className="auth-wrapper">
        {!isNodeAdded && (
          <NodeBox>
            <Box>
              <div className="refresh-wrap">
                <Typography className="node-text">
                  Node Information
                  {/* <Tooltip
                  className="vaildator-card__tooltip"
                  placement="top"
                  arrow
                  title={
                    <Typography variant="h6" padding={1}>
                      Enter Your Validator Node IP <br />
                    </Typography>
                  }
                >
                  <span className="tooltipStyleInfo" style={{ display: "flex", alignItems: "center" }}>
                    <InfoIcon />
                  </span>
                </Tooltip> */}
                </Typography>
              </div>
              {/* {!isLoggedIn ? ( */}
              <>
                <label>Node Information</label>
                <input
                  value={nodeUrl}
                  onChange={(e) => handleNodeChange(e)}
                  disabled={isLoggedIn}
                  placeholder="Enter Node URL"
                />

                <div style={{ marginTop: "50px" }}>
                  <CommonBtn
                    children=" Submit"
                    onClick={handleNode}
                    disabled={!nodeUrl}
                  />
                </div>
              </>

              {/* <Typography className="ver-text" color={theme.palette.gray.main}> */}
              {/* </Typography> */}
            </Box>
          </NodeBox>
        )}
        {isNodeAdded && (
          <NodeBox>
            <Typography className="node-text ">
              {" "}
              <BackButton
                className="back-btns"
                onClick={() => {
                  setNodeUrl("");
                  setIsNodeAdded(false);
                  localStorage.setItem("node", "");
                }}
                title={<BackIcon />}
              />{" "}
              Log In
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="Mnemonics"
                value={mnemonics}
                placeholder="Paste or enter your mnemonics"
                onChange={changeHandler}
                autoComplete="off"
                disabled={!isNodeAdded || isLoading}
                type="password"
                className="input-style"
              />
              {!isNodeAdded ? (
                <span
                  style={{
                    color: "#FF4E4E",
                    fontSize: "14px",
                    marginTop: "5px",
                    display: "block",
                  }}
                >
                  NOTE : Connect With Node For Login
                </span>
              ) : (
                ""
              )}

              <div className="auth-wrapper__btns">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isNodeAdded}
                >
                  <span className="btn-icon">{/* <LoginIcon /> */}</span>
                  Log In
                </Button>
                {/* <CommonBtn variant="contained" children="Log In" type="submit" disabled={!isNodeAdded} /> */}
              </div>
            </form>
          </NodeBox>
        )}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Login;
