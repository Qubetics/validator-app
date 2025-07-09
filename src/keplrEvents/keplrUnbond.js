import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { toast } from "../components/Common/Toast/Toast";

export const keplrUnbond = async (
  userAddress,
  unBoundAmt,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  if (window?.keplr) {
    setIsLoading(true);
    const chainInfos = await window.keplr.getChainInfosWithoutEndpoints();

    const feeObj = chainInfos.find(
      (c) => c.chainId === OsmosisChainInfo.chainId
    );

    const gasPrice = feeObj?.feeCurrencies[0]?.gasPriceStep?.average
      ? Number(feeObj?.feeCurrencies[0]?.gasPriceStep?.average)
      : 25000000000000000;

    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    const fixedVal = unBoundAmt.toFixed(18);
    const scaledAmount = parseUnits(fixedVal, 18).toString();
    let res = "";

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

    try {
      const gasUsed = await simulateMsgs(
        window?.keplr,
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
          window.keplr,
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
    } catch (e) {
      toast.error(e.message);
      console.log("Error while keplr unbond: ", e);

      if (e instanceof Error) {
        console.log(e.message);
      }
      setIsLoading(false);
    }
  }
};
