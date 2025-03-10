/*eslint-disable*/
import { Button } from "@mui/material";
import { DialogContent, StyledDialog } from "./styles";
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
    if (walletType == "keplr") {
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
        let evmAddress = await showEVMAddress(accounts[0].address);
        if (accounts[0].address) {
          dispatch(getWalletType("keplr"));
          dispatch(getEvmAddress(evmAddress));

          dispatch(logInSuccess(accounts[0].address));
          return toast.success("Logged In Successfully");
        }
      } catch (error) {
        console.error("Error connecting Keplr:", error);
      }
    }
  };

  const goBack = () => {
    alert("hi");
    setIsNodeAdded(false);
  };

  return (
    <>
      <StyledDialog
        className="connectionAttempt"
        open={connectionOpen}
        // onClose={connectionClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <h3>
            {" "}
            <span onClick={() => goBack()}>Arrow</span> Login with
          </h3>

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
