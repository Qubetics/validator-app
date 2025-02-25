import { fromBech32, toHex, toBech32, fromHex } from "@cosmjss/encoding";

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

export const valoperAddress = (address) => {
  return new Promise((resolve, reject) => {
    const prefix = "qubetics";
    try {
      const originalAddress = toBech32(prefix, fromHex(address.slice(2)));
      resolve(originalAddress);
    } catch (err) {
      reject(err);
    }
  });
};
