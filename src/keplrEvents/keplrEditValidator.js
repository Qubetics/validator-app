import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { MsgEditValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";

export const keplrEditValidator = async (
  primaryValues,
  valoperAddress,
  hideCommissionField
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;
  let res = "";

  console.log(primaryValues, "PRIMARY");
  return;

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
        commissionRate: hideCommissionField || undefined,
        minSelfDelegation: parseUnits("1", 18).toString(),
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

    try {
      const gasUsed = await simulateMsgs(
        window?.keplr,
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
      return res;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
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
