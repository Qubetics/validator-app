/* eslint-disable */

import { Box, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getValoperAddressFromBlockChain,
  logInSuccess,
  getEvmAddress,
  getWalletType,
} from "../../redux/reducer/auth";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { toast } from "../../components/Common/Toast/Toast";
import { NodeBox } from "./styles";
import getLatestBlocks from "../../services/getLatestBlocks";
import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";
import { checkNodeStatus } from "../../services/checkValidUrl.js";
import Loader from "../../components/Loader/Loader.js";
import { showEVMAddress } from "../../services/showEVMAddress";
import { OsmosisChainInfo } from "../../constants";
import BackButton from "../../components/BackButton/BackButton";
import BackIcon from "../../assets/Icons/BackIcon";
import { convertToValoperAddress } from "../../services/convertToValoperAddress";
import { getAddress } from "../../services/getAddress";
import { userEvmAddress } from "../../services/userEvmAddress";
import fetchValoperAddress from "../../services/fetchValoperAddress";

const Login = () => {
  const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { nodeUrl, setNodeUrl, isNodeAdded, setIsNodeAdded } = useGetNodeUrl();
  const [mnemonics, SetMnemonics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const [connectionOpen, setConnectionOpen] = useState(false);

  const changeHandler = (e) => SetMnemonics(e.target.value?.trim());

  const handleNode = async () => {
    if (nodeUrl.includes("ws://") || nodeUrl.includes("http://")) {
      toast.error(
        "Only secure node URLs are allowed. Please use HTTPS or WSS."
      );
      return;
    }

    if (nodeUrl.includes("https://") || nodeUrl.includes("wss://")) {
      const checkNodeUrl = await checkNodeStatus(nodeUrl);
      if (checkNodeUrl) {
        localStorage.setItem("node", nodeUrl);
        setIsNodeAdded(true);
      } else {
      }
    } else {
      toast.error("Invalid URL");
    }
  };

  const handleNodeChange = (e) => {
    setNodeUrl(e.target.value);
    setIsNodeAdded(false);
  };

  const handleClearNode = () => {
    setNodeUrl("");
    setIsNodeAdded(false);
    localStorage.removeItem("node");
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

const submitMnemonicsHandler = async (event) => {
  event.preventDefault();
  if (!mnemonics) {
    toast.error("Mnemonics is required!");
    return;
  }

  try {
    dispatch(getWalletType("noWallet"));
    setIsLoading(true);

    const [res, evmAddress] = await Promise.all([
      getAddress(mnemonics),
      userEvmAddress(mnemonics)
    ]);


    if (res?.message) {
      toast.error(`Invalid node, ${res.message}`);
      setIsLoading(false);
      return;
    }

    const [block, block1] = await Promise.all([
      getLatestBlocks(),
      getBlockFromChain()
    ]);

    const currentHeight = Number(block?.result?.block?.header?.height);
    const syncedHeight = Number(block1?.data?.blocknumber);

    if (currentHeight !== syncedHeight) {
      toast.error(
        `Either check your node connection or node is not synced, current syncing status: ${currentHeight} out of ${syncedHeight}`
      );
      setIsLoading(false);
      return;
    }

    const valoperResponse = await fetchValoperAddress(mnemonics);

    dispatch(getValoperAddressFromBlockChain(valoperResponse));
    dispatch(getEvmAddress(evmAddress));
    dispatch(logInSuccess(res));

    toast.success("Logged In Successfully");
  } catch (err) {
    toast.error(err?.message || "Something went wrong. Please check your node.");
  } finally {
    setIsLoading(false);
  }
};


  // const connectionClose = () => {
  //   setConnectionOpen(false);
  // };

  const connectKeplr = async () => {
    if (!window.keplr) {
      toast.error("Install Keplr Wallet extension");
      return;
    }
    setIsLoading(true);

    const chainId = OsmosisChainInfo?.chainId;

    try {
      await window.keplr.disable(chainId);
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      if (!accounts.length) {
        toast.error("No accounts found in Keplr");
        return;
      }

      const evmAddress = await showEVMAddress(accounts[0].address);
      const valoperAddress = await convertToValoperAddress(accounts[0].address);

      let block = await getLatestBlocks();
      let block1 = await getBlockFromChain();

      const latestBlockHeight = Number(block?.result?.block?.header?.height);
      const nodeBlockNumber = Number(block1?.data?.blocknumber);

      if (latestBlockHeight !== nodeBlockNumber) {
        toast.error(
          `Either check your node connection or node is not synced. Current syncing status: ${latestBlockHeight} out of ${nodeBlockNumber}`
        );
        return;
      }

      if (latestBlockHeight == nodeBlockNumber) {
        dispatch(getEvmAddress(evmAddress));
        dispatch(getValoperAddressFromBlockChain(valoperAddress));
        dispatch(getWalletType("keplr"));
        dispatch(logInSuccess(accounts[0].address));

        toast.success("Logged In Successfully");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error connecting Keplr:", error);
      toast.error("Failed to connect Keplr. Please try again.");
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <NodeBox>
          <Box>
            <div className="refresh-wrap">
              <Typography className="node-text">
                {isNodeAdded ? (
                  <>
                    <BackButton
                      onClick={handleClearNode}
                      title={<BackIcon />}
                    />
                    {" Login"}
                  </>
                ) : (
                  "Node Information"
                )}
              </Typography>
            </div>

            <>
              {!isNodeAdded && (
                <>
                  <label>Node Information.</label>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      value={nodeUrl}
                      onChange={(e) => handleNodeChange(e)}
                      disabled={isNodeAdded}
                      placeholder="Enter Node URL"
                    />
                  </div>

                  <div style={{ marginTop: "50px" }}>
                    <Button
                      style={{ margin: "auto" }}
                      variant="contained"
                      type="submit"
                      onClick={handleNode}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}

              {/* {isNodeAdded && (
              <form onSubmit={submitMnemonicsHandler}>
              <input
                    label="Mnemonics"
                    value={mnemonics}
                    placeholder="Paste or enter your mnemonics"
                    onChange={changeHandler}
                    autoComplete="off"
                    Connect
                    Wallet
                    disabled={!isNodeAdded || isLoading}
                    type="password"
                    className="input-style"
                  /> */}

              {/* <div className="auth-wrapper__btns">
              <Button
                      style={{ width: "100%", marginBottom: "10px" }}
                      className=""
                      variant="contained"
                      type="submit"
                      disabled={!isNodeAdded}
                    > */}
              {/* <span className="btn-icon"><LoginIcon /></span> */}
              {/* Log In
              </Button>
              </div>
              </form> */}
              {/* )} */}
              {/* {isNodeAdded && <h3 style={{ marginLeft: "48%" }}>OR</h3>} */}
              {isNodeAdded && (
                <div
                  className="auth-wrapper__btns"
                  style={{ padding: "30px 0px" }}
                >
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    type="submit"
                    disabled={!isNodeAdded}
                    onClick={connectKeplr}
                  >
                    {/* <span className="btn-icon"><LoginIcon /></span> */}
                    Connect With Keplr
                  </Button>
                </div>
              )}

              
              {connectionOpen && (
                <LoginModal
                  connectionOpen={true}
                  connectionClose={connectionClose}
                />
              )}
           
            </>
          </Box>
        </NodeBox>

        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Login;
