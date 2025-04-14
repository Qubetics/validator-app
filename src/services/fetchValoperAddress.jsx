import { HD_PATHS } from "../utils/helper";

const { DirectSecp256k1HdWallet } = require("@cosmjss/proto-signing");
const { stringToPath } = require("@cosmjss/crypto");

const fetchValoperAddress = async (mnemonics) => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonics, {
    hdPaths: HD_PATHS,

    prefix: "qubeticsvaloper",
  });
  const [{ address: valoperaddress }] = await wallet.getAccounts();
  return valoperaddress;
};

export default fetchValoperAddress;
