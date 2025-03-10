import { parseUnits } from "ethers";
import { simulateMsgs } from "../util/simulateMsgs";
import { sendMsgs } from "../util/sendMsgs";
import { MsgUndelegate } from "../proto-types-gen/src/cosmos/staking/v1beta1/tx";
import { OsmosisChainInfo } from "../constants";
import { MsgCreateValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";

export const keplrCreateValidator = async () =>
  //   description,
  //   commission,
  //   amount,
  //   valoperAddress,
  //   userAddress,
  //   publicKey
  {
    if (window.keplr) {
      const key = await window.keplr?.getKey(OsmosisChainInfo.chainId);

      const pubkeyBytes = Uint8Array.from(
        PubKey.encode(
          PubKey.fromPartial({
            key: Buffer.from(
              "ABLUdyvLwNpP2M5JnUdB+tgEqhCUXK6vaWUKFbmdU5w=",
              "base64"
            ),
          })
        ).finish()
      );

      const protoMsgs = {
        typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
        value: MsgCreateValidator.encode({
          description: {
            moniker: "OrionOracle",
            identity: "...",
            website: "....",
            securityContact: "...",
            details: "...",
          },
          commission: {
            rate: "200000000000000000", // 0.2
            maxRate: "300000000000000000", // 0.3
            maxChangeRate: "100000000000000000", // 0.1
          },
          minSelfDelegation: "1000000000000000000",
          delegatorAddress: "qubetics1d225xg3gcc764zlucwfvc8ggczsultgz3gd8rn",
          validatorAddress:
            "qubeticsvaloper1d225xg3gcc764zlucwfvc8ggczsultgzj2m3wh",
          pubkey: {
            typeUrl: "/cosmos.crypto.ed25519.PubKey",
            value: pubkeyBytes,
          },
          value: {
            denom: "tics",
            amount: "200000000000000000000",
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
