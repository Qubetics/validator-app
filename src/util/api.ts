// import { toast } from "../components/Common/Toast/Toast";

// export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
//   return fetch(url, init).then(async (response) => {
//     const data = await response.json(); // Read the response once
//     console.error(data?.message, "RESPONSE+++++++++++++"); // Log the response data

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     toast.error(data?.message);
//     return data as T; // Return the parsed data
//   });
// };

import { toast } from "../components/Common/Toast/Toast";

export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init)
    .then(async (response) => {
      const data = await response.json(); // Read the response once
      console.error(data?.message, "RESPONSE+++++++++++++"); // Log the response data

      if (!response.ok) {
        const errorMessage = data?.message || "Something went wrong!"; // Fallback message
        // toast.error(errorMessage); // Display error message in toast
        throw new Error(errorMessage); // Throw an error for better error tracking
      }

      return data as T; // Return the parsed data
    })
    .catch((error) => {
      // toast.error(error.message || "Network error occurred.");
      throw error; // Ensure promise rejection is still handled
    });
};
