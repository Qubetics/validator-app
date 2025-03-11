import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { MsgEditValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const keplrEditValidator = async (
  primaryValues,
  valoperAddress,
  hideCommissionField
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;

  if (window.keplr) {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

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
        await sendMsgs(
          window.keplr,
          OsmosisChainInfo,
          key.bech32Address,
          [protoMsgs],
          {
            amount: [{ denom: "tics", amount: "100000000" }],
            gas: Math.floor(gasUsed * 1.5).toString(),
          }
        );
      } else {
        console.error("Gas estimation failed, transaction aborted.");
      }
    } catch (e) {
      console.error("Transaction Error:", e.message);
    }
  }
};

// description: undefined,
// commission: undefined,
// minSelfDelegation: "",
// delegatorAddress: "",
// validatorAddress: "",
// pubkey: undefined,
// value: undefined,
