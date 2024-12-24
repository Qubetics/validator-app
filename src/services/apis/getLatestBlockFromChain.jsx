import { BASE_URL } from "../../constant";

const getBlockFromChain = async () => {
    try {
        const response = await fetch(`${BASE_URL.VALIDATOR_API}/blocks/latest`)
        const result = await response.json();
        return result;
    } catch (err) {
        return err
    }

}

export default getBlockFromChain;
