// import { toast } from "../components/Common/Toast/Toast";

// export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
//   return fetch(url, init).then(async (response) => {
//     const data = await response.json(); // Read the response once

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     toast.error(data?.message);
//     return data as T; // Return the parsed data
//   });
// };

export const api = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init)
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || "Something went wrong!";
        throw new Error(errorMessage);
      }

      return data as T;
    })
    .catch((error) => {
      throw error;
    });
};
