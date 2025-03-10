import { bech32 } from "bech32";

export const convertToValoperAddress = (address) => {
  try {
    if (!address) throw new Error("Address is undefined");

    const decoded = bech32.decode(address);
    return bech32.encode("qubeticsvaloper", decoded.words); // Prefix for your chain
  } catch (error) {
    console.error("Invalid address or decoding error:", error.message);
    return null;
  }
};
