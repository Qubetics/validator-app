import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { MsgEditValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const cosmostationEditValidator = async (
  primaryValues,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;
  let res = "";

  if (window?.cosmostation) {
    setIsLoading(true);
    const gasPrice = 0.025;

    const key = await window?.cosmostation?.providers?.keplr?.getKey(
      OsmosisChainInfo.chainId
    );

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
        commissionRate: "",
        minSelfDelegation: "",
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

      if (gasUsed > 0) {
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
      setIsLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      if (error instanceof Error) {
        console.log(
          "Error while create validator using cosmostation: ",
          error?.message
        );
      } else {
        console.log("Error while bondMore using cosmostation: ", error);
      }
    }
    navigate("/dashboard");
  }
};
