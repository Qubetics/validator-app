import { fromBech32, toHex } from "@cosmjss/encoding";

export const showEVMAddress = (address) => {
  return new Promise((resolve, reject) => {
    try {
      const evmAddress = toHex(fromBech32(address).data);
      resolve("0x" + evmAddress);
    } catch (err) {
      reject(err); // Properly rejects the Promise
    }
  });
};
