import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgBeginRedelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/Common/Toast/Toast";

export const keplrRedelegate = async (
  userAddress,
  selectedAccount,
  valoperAddress,
  stakeAmount
) => {
  if (window.keplr) {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    const scaledAmount = parseUnits(stakeAmount.toString(), 18).toString();
    let res = "";

    const protoMsgs = {
      typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
      value: MsgBeginRedelegate.encode({
        delegatorAddress: userAddress,
        validatorSrcAddress: selectedAccount,
        validatorDstAddress: valoperAddress,

        amount: {
          denom: "tics",
          amount: scaledAmount, //userInput
        },
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
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
      setIsLoading(false);
      console.log(e.message);
    }
  }
};
