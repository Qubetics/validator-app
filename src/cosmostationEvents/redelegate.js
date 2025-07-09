import { parseUnits } from "ethers";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { MsgBeginRedelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";

export const cosmostationRedelegate = async (
  userAddress,
  selectedAccount,
  valoperAddress,
  stakeAmount,
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
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: MsgBeginRedelegate.encode({
          delegatorAddress: userAddress,
          validatorSrcAddress: selectedAccount,
          validatorDstAddress: valoperAddress,

          amount: {
            denom: "tics",
            amount: scaledAmount,
          },
        }).finish(),
      };

      const gasUsed = await simulateMsgs(
        window?.cosmostation?.providers?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }] //Dummy payload just to get estimate fee
      );

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
        if (res) {
          setTimeout(() => {
            toast.success("Transaction successful");
            navigate("/dashboard");
            setIsLoading(false);
          }, 4000);
        } else {
          throw new Error("Transaction failed. Please try again.");
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      if (error instanceof Error) {
        console.log("Erorr while redelegate using cosmostation : ", error?.message);
      } else {
        console.log("Erorr while redelegate using cosmostation : ", error);
      }
    }
  }
};
