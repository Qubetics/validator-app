import { BASE_URL } from "../../constant";

const getAllBlocks = async (page, limit) => {

    const response = await fetch(`${BASE_URL.VALIDATOR_API}/blocks?page=${page}&limit=${limit}`)
    const result = await response.json();
    return result;
}

export default getAllBlocks;
