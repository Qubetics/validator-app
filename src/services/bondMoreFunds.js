import { DENOM, FEE, PREFIX } from "../constant";
import { noExponential } from "../utils/commonFunctions";
import { HD_PATHS } from "../utils/helper";

const { DirectSecp256k1HdWallet } = require("@cosmjss/proto-signing");
const { SigningStargateClient, GasPrice } = require("@cosmjss/stargate");
const { MsgDelegate } = require("cosmjs-types/cosmos/staking/v1beta1/tx");

export default async function bondMoreFunds(
  mnemonic,
  address,
  amount,
  valporAddress
) {
  let nodeUrl = localStorage.getItem("node") || "";
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    hdPaths: HD_PATHS,
    prefix: PREFIX,
  });
  const [{ address: senderAddress }] = await wallet.getAccounts();

  const gasPrice = GasPrice.fromString(`${FEE}tics`);
  const client = await SigningStargateClient.connectWithSigner(
    nodeUrl, //user input
    wallet,
    {
      gasPrice: gasPrice,
    }
  );
  const fee = {
    amount: [{ denom: DENOM, amount: "3800000000000000000" }],
    gas: "800000",
  };

  console.log(address, valporAddress, "Addres");
  const sendMsg = {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    value: MsgDelegate.fromPartial({
      delegatorAddress: address, //userInput
      validatorAddress: valporAddress, //userInput
      amount: {
        denom: DENOM,
        amount: noExponential(Number(amount) * 10 ** 18), //userInput
      },
    }),
  };

  const txResult = await client.signAndBroadcastSync(
    senderAddress,
    [sendMsg],
    fee,
    "make delegator"
  );
  return txResult;
}
