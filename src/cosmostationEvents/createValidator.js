import { parseUnits } from "ethers";
import { sendMsgs } from "../util/sendMsgs";
import { OsmosisChainInfo } from "../constants";
import { simulateMsgs } from "../util/simulateMsgs";
import { toast } from "../components/Common/Toast/Toast";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { MsgCreateValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";

export const cosmostationCreateValidator = async (
  primaryValues,
  secondaryValues,
  valoperAddress,
  userAddress,
  publicKey,
  setLoader,
  navigate
) => {
  const { name, details, identity, website, SecurityContact } = primaryValues;
  let res = "";

  if (window?.cosmostation) {
    setLoader(true);

    const gasPrice = 0.025;

    const key = await window?.cosmostation?.providers?.keplr?.getKey(
      OsmosisChainInfo.chainId
    );

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
          setLoader(false);
        }, 4000);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (error) {
      setLoader(false);
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
  }
};
