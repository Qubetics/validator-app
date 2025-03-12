import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { MsgEditValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { toast } from "../components/Common/Toast/Toast";

export const keplrEditValidator = async (
  primaryValues,
  valoperAddress,
  setIsLoading,
  navigate
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;
  let res = "";

  if (window.keplr) {
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
        commissionRate: "",
        minSelfDelegation: "",
      }).finish(),
    };

    try {
      const gasUsed = await simulateMsgs(
        window.keplr,
        OsmosisChainInfo,
        key.bech32Address,
        [protoMsgs],
        [{ denom: "tics", amount: "100000000" }]
      );

      if (gasUsed > 0) {
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
      navigate("/dashboard");
      console.error("Transaction Error:", e.message);
    }
    setIsLoading(false);
  }
};
