import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { MsgCreateValidator } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { parseUnits, formatEther } from "ethers";
import { toast } from "../components/Common/Toast/Toast";
import { MIN_BOND_AMOUNT } from "../constant";
import { OsmosisChainInfo } from "../constants";
import { sendMsgs } from "../util/sendMsgs";
import { simulateMsgs } from "../util/simulateMsgs";
export const keplrCreateValidator = async (
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

  if (window.keplr) {
    setLoader(true);

    const chainInfos = await window.keplr.getChainInfosWithoutEndpoints();

    const feeObj = chainInfos.find(
      (c) => c.chainId === OsmosisChainInfo.chainId
    );

    const gasPrice = feeObj?.feeCurrencies[0]?.gasPriceStep?.average
      ? Number(feeObj?.feeCurrencies[0]?.gasPriceStep?.average)
      : 25000000000000000;

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
        minSelfDelegation: formatEther(MIN_BOND_AMOUNT.toString()),
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
        [{ denom: "tics", amount: "100000000" }] //Dummy payload just to get estimate fee
      );

      if (gasUsed > 0) {
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
          setLoader(false);
        }, 4000);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (e) {
      setLoader(false);
      toast.error(e.message);
      console.error("Transaction Error:", e.message);
    }
  }
};
