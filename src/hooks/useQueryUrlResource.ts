import { useEffect, useState } from "react";
import { fetchUrlResource } from "../lib/utils";

export function useQueryUrlResource<T>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    (async function fetchData() {
      try {
        setIsLoading(isLoading);
        const data = await fetchUrlResource<T>(url);
        setData(data);
        setIsLoading(false);
      } catch {
        setIsError(true);
      }
    })();
  }, [url]);

  return {
    data,
    isError,
    isLoading,
  };
}
