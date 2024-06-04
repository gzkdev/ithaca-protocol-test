import { Dispatch } from "react";

export async function fetchResource<T>(
  url: string,
  setState?: Dispatch<React.SetStateAction<T>>
) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    setState?.(data);
  } catch {
    throw new Error("");
  }
}
