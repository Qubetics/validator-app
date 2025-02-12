import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { stringToPath } from "@cosmjss/crypto";
import { SigningStargateClient } from "@cosmjss/stargate";
// import { fromBech32, toHex } from "@cosmjss/encoding";
import { PREFIX } from "../constant";

export const getAddress = async (mnemonics) => {
  try {
    let nodeUrl = localStorage.getItem("node") || "";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      hdPaths: [stringToPath("m/44'/60'/0'/0/0")],
      prefix: PREFIX,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      nodeUrl,
      wallet
    );
    /* FROM NATIVE TO HEX*/
    // let hexAddress = toHex(fromBech32(senderAddress).data);

    /**********************************************/
    return senderAddress;
    // return "0x" + hexAddress;
  } catch (err) {
    return err;
  }
};
