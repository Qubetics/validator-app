import { DirectSecp256k1HdWallet } from "@cosmjss/proto-signing";
import { SigningStargateClient } from "@cosmjss/stargate";
// import { fromBech32, toHex } from "@cosmjss/encoding";
import { PREFIX } from "../constant";
import { HD_PATHS } from "../utils/helper";

export const getAddress = async (mnemonics) => {
  try {
    let nodeUrl = localStorage.getItem("node") || "";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
      hdPaths: HD_PATHS,
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
