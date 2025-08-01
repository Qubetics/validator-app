import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { MsgEditValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { toast } from "../components/Common/Toast/Toast";
import { parseUnits } from "ethers";

export const keplrEditValidator = async (
  primaryValues,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  const { name, details, identity, website, SecurityContact, CommissionRate } =
    primaryValues;
  let res = "";
  const comission = parseUnits(CommissionRate.toString(), 18).toString();

  if (window?.keplr) {
    const chainInfos = await window.keplr?.getChainInfosWithoutEndpoints();

    const feeObj = chainInfos.find(
      (c) => c.chainId === OsmosisChainInfo.chainId
    );

    const gasPrice = feeObj?.feeCurrencies[0]?.gasPriceStep?.average
      ? Number(feeObj?.feeCurrencies[0]?.gasPriceStep?.average)
      : 25000000000000000;

    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    setIsLoading(true);

    const protoMsgs = {
      typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
      value: MsgEditValidator.encode({
        description: {
          moniker: name,
          identity: identity,
          website: website,
          securityContact: SecurityContact,
          details: details,
        },
        validatorAddress: valoperAddress,
        commissionRate: comission,
        minSelfDelegation: "",
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
        window.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }] //Dummy payload just to get estimate fee
      );

      if (gasUsed > 0) {
        const gasLimit = Math.floor(gasUsed * 1.3); //Buffer added
        const feeAmount = Math.ceil(gasLimit * gasPrice).toString();

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
      navigate("/dashboard");
      console.error("Transaction Error:", e.message);
    }
    setIsLoading(false);
  }
};
