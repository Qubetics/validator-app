import { BASE_URL } from "../../constant";

const getAllBlocks = async (page, limit) => {
  try {
    const response = await fetch(
      `${BASE_URL.VALIDATOR_API}/blocks?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return { error: true, message: error.message };
  }
};

export default getAllBlocks;
