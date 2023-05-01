import { useEffect, useState } from "react";

function UseApi(url, options) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

export default UseApi;
