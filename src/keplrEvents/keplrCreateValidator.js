import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { MsgCreateValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const keplrCreateValidator = async (
  description,
  commission,
  amount,
  valoperAddress,
  userAddress,
  publicKey
) => {
  if (window.keplr) {
    const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);
    const scaledAmount = parseUnits(amount.toString(), 18).toString();

    console.log(
      description,
      commission,
      valoperAddress,
      userAddress,
      publicKey,
      scaledAmount
    );

    // const protoMsgs = {
    //   typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
    //   value: MsgCreateValidator.encode({
    //     description: description,
    //     commission: commission,
    //     minSelfDelegation: scaledAmount,
    //     delegatorAddress: userAddress,
    //     validatorAddress: valoperAddress,
    //     pubkey: publicKey,
    //     amount: {
    //       denom: "tics",
    //       amount: scaledAmount, //userInput
    //     },
    //   }).finish(),
    // };

    const protoMsgs = {
      typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
      value: MsgCreateValidator.encode({
        description: {
          moniker: "My Validator",
          identity: "",
          website: "",
          securityContact: "",
          details: description || "",
        },
        commission: {
          rate: commission?.rate || "0.1",
          maxRate: commission?.maxRate || "0.2",
          maxChangeRate: commission?.maxChangeRate || "0.01",
        },
        minSelfDelegation: scaledAmount.toString(),
        delegatorAddress: userAddress,
        validatorAddress: valoperAddress,
        pubkey: {
          typeUrl: "/cosmos.crypto.ed25519.PubKey",
          value: new Uint8Array(Buffer.from(publicKey, "base64")),
        },
        amount: {
          denom: "tics",
          amount: scaledAmount.toString(),
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
      }
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
