import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUnjail } from "cosmjs-types/cosmos/slashing/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/Common/Toast/Toast";

export const keplrUnjail = async (valoperAddress, navigate, setIsLoading) => {
  if (window.keplr) {
    setIsLoading(true);
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    let res = "";

    const protoMsgs = {
      typeUrl: "/cosmos.slashing.v1beta1.MsgUnjail",
      value: MsgUnjail.encode({
        validatorAddr: valoperAddress,
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
        window?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }]
      );
      if (gasUsed) {
        res = await sendMsgs(
          window.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: "100000000" }],
            gas: Math.floor(gasUsed * 1.5).toString(),
          }
        );
      }
      if (res) {
        setTimeout(() => {
          toast.success("Transaction successful");
          navigate("/dashboard");
          setIsLoading(false);
        }, 4000);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (e) {
      toast.error(e.message);
      if (e instanceof Error) {
        console.log(e.message);
      }
      setIsLoading(false);
    }
  }
};
