import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { MsgUnjail } from "cosmjs-types/cosmos/slashing/v1beta1/tx";

export const cosmostationUnjail = async (valoperAddress, navigate, setIsLoading) => {
  if (window?.cosmostation) {
    setIsLoading(true);

    const gasPrice = 0.025;

    const key = await window?.cosmostation?.providers?.keplr?.getKey(
      OsmosisChainInfo.chainId
    );

    let res = "";
    const protoMsgs = {
      typeUrl: "/cosmos.slashing.v1beta1.MsgUnjail",
      value: MsgUnjail.encode({
        validatorAddr: valoperAddress,
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
        window?.cosmostation?.providers?.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }] //Dummy payload just to get estimate fee
      );
      if (gasUsed) {
        const gasLimit = Math.floor(gasUsed * 1.3); //Buffer added
        const feeAmount = Math.ceil(gasLimit * gasPrice).toString();

        console.log("feeAmount : ", feeAmount);

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
