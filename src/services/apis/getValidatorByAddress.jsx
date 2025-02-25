import { BASE_URL } from "../../constant";
import { valoperAddress } from "../showEVMAddress";

const getValidatorByAddress = async (value, page, limit) => {
  let val = value?.trim();
  const valAddress = await valoperAddress(val);
  const response = page
    ? await fetch(
        `${BASE_URL.VALIDATOR_API}/validators/search?value=${valAddress}&page=${page}&limit=${limit}`
      )
    : await fetch(
        `${BASE_URL.VALIDATOR_API}/validators/search?value=${valAddress}`
      );
  const result = await response.json();
  return result;
};
export default getValidatorByAddress;
