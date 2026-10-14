import { BASE_URL } from "../../constant";

const getDashboardWidgets = async (address) => {
  try {
    const response = await fetch(
      `${BASE_URL.VALIDATOR_API}/validators/details?address=${address}`
    );
    if (!response.ok) {
      throw new Error();
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default getDashboardWidgets;
