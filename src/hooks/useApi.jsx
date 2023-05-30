import { useEffect, useState } from "react";

/**
 * Custom hook for APi requests, and managing the response
 *@param {string} url - The endpoint URL
 * @param {Object} options - Options for request, including HTTP method, headers etc.
 * @returns {Object} - An object containing the response data, loading state, and error state
 * @property {any} data - The response from the API
 * @property {boolean} isLoading - Show if the request is in prosess
 * @property {boolean} isError - Show if there was an error in the request
 */

function useApi(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, options);

        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, isLoading, isError };
}

export default useApi;
