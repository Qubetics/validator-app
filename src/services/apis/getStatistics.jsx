import { BASE_URL } from "../../constant";

const getAllStats = async () => {
  const response = await fetch(`${BASE_URL.VALIDATOR_API}/explorer/dashboard`);
  if (!response.ok) {
    throw new Error();
  }
  const result = await response.json();
  return result;
};

export default getAllStats;
