import { BASE_URL } from "../../constant";

const getValidatorByAddress = async (value, page, limit) => {
    const response = page ?
        await fetch(`${BASE_URL.VALIDATOR_API}/validators/search?value=${value}&page=${page}&limit=${limit}`) :
        await fetch(`${BASE_URL.VALIDATOR_API}/validators/search?value=${value}`)
    const result = await response.json();
    return result;
}
export default getValidatorByAddress;
