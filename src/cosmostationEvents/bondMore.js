import { parseUnits } from "ethers";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { MsgDelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";

export const cosmosStationBondMore = async (
  userAddress,
  valoperAddress,
  stakeAmount,
  setIsLoading,
  navigate
) => {
  if (window?.cosmostation?.providers?.keplr) {
    try {
      const gasPrice = 0.025;

      const key = await window?.cosmostation?.providers?.keplr?.getKey(
        OsmosisChainInfo.chainId
      );

      console.log("key : ", key);

      const scaledAmount = parseUnits(stakeAmount.toString(), 18).toString();
      console.log("scaledAmount : ", scaledAmount);

      const protoMsgs = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.encode({
          delegatorAddress: userAddress,
          validatorAddress: valoperAddress,
          amount: {
            denom: "tics",
            amount: scaledAmount,
          },
        }).finish(),
      };

      console.log("protoMsgs : ", protoMsgs);

      const gasUsed = await simulateMsgs(
        window?.cosmostation?.providers?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }]
      );

      console.log("gasUsed :", gasUsed);

      let res = "";
      if (gasUsed) {
        const gasLimit = Math.floor(gasUsed * 1.3); //Buffer
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

      console.log("res: ", res);
      
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      if (error instanceof Error) {
        console.log(
          "Error while bondMore using cosmostation: ",
          error?.message
        );
      } else {
        console.log("Error while bondMore using cosmostation: ", error);
      }
    }
  }
};
