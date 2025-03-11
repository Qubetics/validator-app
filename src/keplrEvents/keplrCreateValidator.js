import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { MsgCreateValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";

export const keplrCreateValidator = async (
  primaryValues,
  secondaryValues,
  valoperAddress,
  userAddress,
  publicKey
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;
  let res = "";

  if (window.keplr) {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    const scaledBondAmount = parseUnits(
      secondaryValues?.Bond_Amount.toString(),
      18
    ).toString();
    const commissionRate = parseUnits(
      secondaryValues?.Commission_Rate.toString(),
      18
    ).toString();
    const maxRate = parseUnits(
      secondaryValues?.Max_Rate.toString(),
      18
    ).toString();
    const maxChangeRate = parseUnits(
      secondaryValues?.Max_Change_Rate.toString(),
      18
    ).toString();

    const pubkeyBytes = Uint8Array.from(
      PubKey.encode(
        PubKey.fromPartial({
          key: Buffer.from(publicKey, "base64"),
        })
      ).finish()
    );

    const protoMsgs = {
      typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
      value: MsgCreateValidator.encode({
        description: {
          moniker: name,
          identity: identity,
          website: website,
          securityContact: SecurityContact,
          details: details,
        },
        commission: {
          rate: commissionRate,
          maxRate: maxRate,
          maxChangeRate: maxChangeRate,
        },
        minSelfDelegation: "1000000000000000000",
        delegatorAddress: userAddress,
        validatorAddress: valoperAddress,
        pubkey: {
          typeUrl: "/cosmos.crypto.ed25519.PubKey",
          value: pubkeyBytes,
        },
        value: {
          denom: "tics",
          amount: scaledBondAmount,
        },
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
      console.log(gasUsed, "GASUSED");

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

    // try {
    //   const gasUsed = await simulateMsgs(
    //     window?.keplr,
    //     OsmosisChainInfo,
    //     key.bech32Address,
    //     [protoMsgs],
    //     [{ denom: "tics", amount: "100000000" }]
    //   );
    //   if (gasUsed) {
    //     res = await sendMsgs(
    //       window.keplr,
    //       OsmosisChainInfo,
    //       key.bech32Address,
    //       [protoMsgs],
    //       {
    //         amount: [{ denom: "tics", amount: "100000000" }],
    //         gas: Math.floor(gasUsed * 1.5).toString(),
    //       }
    //     );
    //   }
    //   return res;
    // } catch (e) {
    //   if (e instanceof Error) {
    //     console.log(e.message);
    //   }
    // }
  }
};

// description: undefined,
// commission: undefined,
// minSelfDelegation: "",
// delegatorAddress: "",
// validatorAddress: "",
// pubkey: undefined,
// value: undefined,
