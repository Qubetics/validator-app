import { parseUnits } from "ethers";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";

export const cosmostationUnbond = async (
  userAddress,
  stakeAmount,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  if (window?.cosmostation) {
    try {
      const gasPrice = 0.025;

      const key = await window?.cosmostation?.providers?.keplr?.getKey(
        OsmosisChainInfo.chainId
      );
      const scaledAmount = parseUnits(stakeAmount.toString(), 18).toString();

      const protoMsgs = {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: MsgUndelegate.encode({
          delegatorAddress: userAddress,
          validatorAddress: valoperAddress,
          amount: {
            denom: "tics",
            amount: scaledAmount,
          },
        }).finish(),
      };

      console.log("scaledAmount: ", scaledAmount);
      console.log("protoMsgs: ", protoMsgs);
      
      const gasUsed = await simulateMsgs(
        window?.cosmostation?.providers?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }] //Dummy payload just to get estimate fee
      );
      
      console.log("gasUsed: ", gasUsed);
      let res = "";
      if (gasUsed) {
        const gasLimit = Math.floor(gasUsed * 1.3); //Buffer added
        const feeAmount = Math.ceil(gasLimit * gasPrice).toString();

        res = await sendMsgs(
          window?.cosmostation?.providers?.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: feeAmount }],
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
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong!");
      setIsLoading(false);
      if (error instanceof Error) {
        console.log("Erorr while unbond using cosmostation : ", error?.message);
      } else {
        console.log("Erorr while unbond using cosmostation : ", error);
      }
    }
  }
};
