/*eslint-disable*/
import { Button } from "@mui/material";
import { CancelIconWrapper, DialogContent, StyledDialog } from "./styles";
import { OsmosisChainInfo } from "../../constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { showEVMAddress } from "../../services/showEVMAddress";
import {
  getValoperAddressFromBlockChain,
  getEvmAddress,
  getWalletType,
  logInSuccess,
} from "../../redux/reducer/auth";
import Loader from "../Loader/Loader";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { toast } from "../Common/Toast/Toast";
import CommonBtn from "../Common/Commonbtn/Commonbtn";
import { convertToValoperAddress } from "../../services/convertToValoperAddress";
import BackButton from "../BackButton/BackButton";
import { BackIcon } from "../../assets/Icons/SvgIcon.jsx";
import getLatestBlocks from "../../services/getLatestBlocks";
import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";
import Keplr from "../../assets/Images/keplr.svg";
import QubeticsLogo from "../../assets/Images/LogoSmall.svg";
import cosmostation from "../../assets/Images/cosmostation.svg";
import CancelIcon from "../../assets/Icons/CancelIcon";

const LoginModal = ({ connectionOpen, connectionClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { nodeUrl, setIsNodeAdded } = useGetNodeUrl();

  const connectWallet = async (event, walletType) => {
    event.preventDefault();
    if (walletType == "qubetics") {
      if (!window?.qubetics) {
        toast.error("Install Qubetics Wallet extension");
        return;
      }
      try {
        const data = {
          nodeUrl,
        };
        setIsLoading(true);

        await window?.qubetics.sendRequest(
          "nativeConnect",
          data,
          async (error, response) => {
            if (response?.type == "error") {
              setIsLoading(false);
              toast.error(response?.data?.message || "Something went wrong");
              return;
            }
            if (response?.data) {
              try {
                let block = await getLatestBlocks();
                let block1 = await getBlockFromChain();

                if (
                  block?.result?.block?.header?.height &&
                  block1?.data?.blocknumber
                ) {
                  if (
                    block?.result?.block?.header?.height ==
                    block1?.data?.blocknumber
                  ) {
                    console.log("Response from blockChain : ", response);

                    dispatch(
                      getValoperAddressFromBlockChain(
                        response?.data?.valoperAddress
                      )
                    );

                    let evmAddress = response?.data?.evmAddress;
                    if (!evmAddress) {
                      evmAddress = await showEVMAddress(
                        response?.data?.address
                      );
                    }
                    dispatch(getEvmAddress(evmAddress));
                    dispatch(getWalletType("qubetics"));
                    dispatch(logInSuccess(response?.data?.address));
                    setIsLoading(false);
                    return toast.success("Logged In Successfully");
                  } else {
                    setIsLoading(false);
                    return toast.error(
                      `Either check your node connection or node is not synced, current syncing status: ${block?.result?.block?.header?.height} out of ${block1?.data?.blocknumber}`
                    );
                  }
                }
              } catch (err) {
                console.error(err);
                setIsLoading(false);
                toast.error("An error occurred while processing the request.");
              }
            }
          }
        );
        // }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err?.message || "Check your node");
      }
    }
    if (walletType === "keplr") {
      if (!window.keplr) {
        toast.error("Install Keplr Wallet extension");
        return;
      }

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
        const valoperAddress = await convertToValoperAddress(
          accounts[0].address
        );

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
      } catch (error) {
        console.error("Error connecting Keplr:", error);
        toast.error("Failed to connect Keplr. Please try again.");
      }
    }
    if (walletType === "cosmostation") {
      try {
        if (!window.cosmostation) {
          toast.error("Please install the Cosmostation extension!");
          return;
        }
        const chainId = OsmosisChainInfo?.chainId;
        await window?.cosmostation.providers.keplr.experimentalSuggestChain(
          OsmosisChainInfo
        );
        const cosmoKeplr = window.cosmostation?.providers?.keplr;

        await window?.cosmostation?.providers?.keplr.enable(chainId);

        const signer = await cosmoKeplr.getOfflineSigner(chainId);

        const accounts = await signer.getAccounts();
        if (!accounts?.length) {
          toast.error("No accounts found in Keplr");
          return;
        }

        let block = await getLatestBlocks();
        let block1 = await getBlockFromChain();

        const latestBlockHeight = Number(block?.result?.block?.header?.height);
        const nodeBlockNumber = Number(block1?.data?.blocknumber);

        console.log(
          "latestBlockHeight !== nodeBlockNumber : ",
          latestBlockHeight,
          nodeBlockNumber
        );

        if (latestBlockHeight !== nodeBlockNumber) {
          toast.error(
            `Either check your node connection or node is not synced. Current syncing status: ${latestBlockHeight} out of ${nodeBlockNumber}`
          );
          return;
        }

        if (latestBlockHeight == nodeBlockNumber) {
          const evmAddress = await showEVMAddress(accounts[0].address);
          const valoperAddress = await convertToValoperAddress(
            accounts[0].address
          );
          dispatch(getEvmAddress(evmAddress));
          dispatch(getValoperAddressFromBlockChain(valoperAddress));
          dispatch(getWalletType("cosmostation"));
          dispatch(logInSuccess(accounts[0].address));

          toast.success("Logged In Successfully");
        }

        if (accounts[0].address) {
          dispatch(getWalletType("cosmostation"));
          dispatch(getEvmAddress(evmAddress));

          dispatch(logInSuccess(accounts[0].address));
          return toast.success("Logged In Successfully");
        }
      } catch (err) {
        console.error("Connection failed", err);
      }
    }
  };

  return (
    <>
      <StyledDialog
        className="connectionAttempt"
        open={connectionOpen}
        onClose={connectionClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <h3>Login with</h3>

          <div className="connectionAttempt_btn">
            <div className="connectionAttempt_btn_inner">
              <img src={Keplr} alt="" />
              <button onClick={(event) => connectWallet(event, "keplr")}>
                Keplr Connect
              </button>
            </div>

            <div className="connectionAttempt_btn_inner">
              <img src={QubeticsLogo} alt="" />
              <button onClick={(event) => connectWallet(event, "qubetics")}>
                Qubetics Wallet
              </button>
            </div>
            
            <div className="connectionAttempt_btn_inner">
              <img src={cosmostation} alt="logo" />

              <button onClick={(event) => connectWallet(event, "cosmostation")}>
                Cosmostation Wallet
              </button>
            </div>
          </div>
        </DialogContent>
      </StyledDialog>
      {isLoading && <Loader />}
    </>
  );
};

export default LoginModal;
