import { useEffect, useReducer } from "react";
import { fetchUrlResource } from "../lib/utils";

// State type
interface State<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
}

// Action types
type Action<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_FAILURE" };

const initialState = <T>(): State<T> => ({
  data: undefined,
  isLoading: true,
  isError: false,
});

function dataFetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/**
 * Custom hook to fetch data from a given URL and handle loading and error states.
 *
 * @template T - The expected type of the data being fetched.
 * @param {string} url - The URL from which to fetch data.
 * @returns {Object} - An object containing the fetched data, loading state, and error state.
 * @returns {T | undefined} data - The fetched data, or undefined if not yet fetched.
 * @returns {boolean} isLoading - True if the data is still being loaded, false otherwise.
 * @returns {boolean} isError - True if an error occurred while fetching data, false otherwise.
 */
export function useQueryUrlResource<T>(url: string) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState<T>());

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const data = await fetchUrlResource<T>(url, { signal });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        if (!signal.aborted) {
          dispatch({ type: "FETCH_FAILURE" });
        } else {
          console.log("Fetch aborted");
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data: state.data as T,
    isLoading: state.isLoading,
    isError: state.isError,
  };
}
