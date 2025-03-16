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
import CancelIcon from "../../assets/Icons/CancelIcon";

const LoginModal = ({ connectionOpen, connectionClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { nodeUrl, setIsNodeAdded } = useGetNodeUrl();

  const connectWallet = async (event, walletType) => {
    event.preventDefault();
    if (walletType == "qubetics") {
      if (!window?.qubetics) {
        toast.error("Install Qubetics Wallet Extenion");
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
                    dispatch(
                      getValoperAddressFromBlockChain(
                        response?.data?.valoperAddress
                      )
                    );
                    let evmAddress = await showEVMAddress(
                      response?.data?.address
                    );
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
  };

  const handleCross = () => {
    alert("hi");
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
              <Button
                className="headermetaBtn"
                onClick={(event) => connectWallet(event, "keplr")}
              >
                Keplr Connect
              </Button>
            </div>
            <div className="connectionAttempt_btn_inner">
              <Button
                className="headermetaBtn"
                onClick={(event) => connectWallet(event, "qubetics")}
              >
                Qubetics Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </StyledDialog>
      {isLoading && <Loader />}
    </>
  );
};

export default LoginModal;
