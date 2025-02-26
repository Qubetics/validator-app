import { BASE_URL } from "../../constant";
import { valoperAddress } from "../showEVMAddress";

const getValidatorByAddress = async (value, page, limit) => {
  let valAddress = value?.trim();

  if (valAddress.startsWith("0x")) {
    valAddress = await valoperAddress(valAddress);
  }
  const response = page
    ? await fetch(
        `${BASE_URL.VALIDATOR_API}/validators/search?value=${valAddress}&page=${page}&limit=${limit}`
      )
    : await fetch(
        `${BASE_URL.VALIDATOR_API}/validators/search?value=${valAddress}`
      );
  const result = await response.json();
  console.log(result, "result", valAddress);
  return result;
};
export default getValidatorByAddress;
