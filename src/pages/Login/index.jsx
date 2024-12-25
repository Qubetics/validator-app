/* eslint-disable */

import { Button, Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/Common/TextField";
import InfoIcon from "../../assets/Icons/InfoIcon.jsx";
import LoginIcon from "../../assets/Icons/LoginIcon";
import {
  getValoperAddressFromBlockChain,
  logInSuccess,
} from "../../redux/reducer/auth";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { toast } from "../../components/Common/Toast/Toast";
import { getAddress } from "../../services/getAddress";
import { NodeBox } from "./styles";
import fetchValoperAddress from "../../services/fetchValoperAddress";
import getLatestBlocks from "../../services/getLatestBlocks";
import theme from "../../theme";

import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";

const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, SetMnemonics] = useState("");
  const { isLoggedIn, userAddress, isTx } = useSelector((state) => state.auth);
  const changeHandler = (e) => SetMnemonics(e.target.value?.trim());
  const { nodeUrl, setNodeUrl, isNodeAdded, setIsNodeAdded } = useGetNodeUrl();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!mnemonics) {
        toast.error("Mnemonics is required!");
        return;
      }
      if (mnemonics?.length > 0) {
        let res = await getAddress(mnemonics);
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
            dispatch(logInSuccess(res));
            return toast.success("Logged In Successfully");
          } else {
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

  const handleNode = () => {
    if (
      nodeUrl.includes("ws://") ||
      nodeUrl.includes("https://") ||
      nodeUrl.includes("http://") ||
      nodeUrl.includes("wss://")
    ) {
      localStorage.setItem("node", nodeUrl);
      setIsNodeAdded(true);
    }
  };
  const handleNodeChange = (e) => {
    setNodeUrl(e.target.value);
    setIsNodeAdded(false);
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-wrapper__inner">
          <Typography variant="h3">Log In.</Typography>
          <hr className="custom-divider" />
          <form onSubmit={submitHandler}>
            <TextField
              label="Mnemonics"
              value={mnemonics}
              placeholder="Paste or enter your mnemonics"
              onChange={changeHandler}
              autoComplete="off"
              disabled={!isNodeAdded}
              type="password"
              className="input-style"
            />
            <div className="auth-wrapper__btns">
              <Button
                variant="contained"
                type="submit"
                fullWidth={true}
                disabled={!isNodeAdded}
              >
                <span className="btn-icon">
                  <LoginIcon />
                </span>
                Log In
              </Button>
            </div>
            {!isNodeAdded ? (
              <h3 style={{ color: "red" }}>
                NOTE : Connect With Node For Login
              </h3>
            ) : (
              ""
            )}
            <NodeBox>
              <Box>
                <div className="refresh-wrap">
                  <Typography
                    className="node-text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    Node Information
                    <Tooltip
                      className="vaildator-card__tooltip"
                      placement="top"
                      arrow
                      title={
                        <Typography variant="h6" padding={1}>
                          Enter Your Validator Node IP <br />
                        </Typography>
                      }
                    >
                      <span
                        className="tooltipStyleInfo"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <InfoIcon />
                      </span>
                    </Tooltip>
                  </Typography>
                </div>

                {!isLoggedIn ? (
                  <>
                    <input
                      value={nodeUrl}
                      onChange={(e) => handleNodeChange(e)}
                      disabled={isLoggedIn}
                    />
                    <Button variant="contained" onClick={handleNode}>
                      Submit
                    </Button>
                  </>
                ) : (
                  ""
                )}
                <Typography
                  className="ver-text"
                  color={theme.palette.gray.main}
                >
                  {isNodeAdded == true ? nodeUrl : "Enter Valid Node Url"}
                </Typography>
              </Box>
            </NodeBox>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
