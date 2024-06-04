import useSWR from "swr";

type FetcherArgs = [input: RequestInfo, init?: RequestInit];

const fetcher = async <T>(...args: FetcherArgs): Promise<T> => {
  const response = await fetch(...args);
  return await response.json();
};

export default function useQueryResource(url: string) {
  return useSWR(url, fetcher);
}
