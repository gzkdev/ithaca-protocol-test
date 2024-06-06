import { useMemo, useReducer, useCallback } from "react";
import {
  AppReducerData,
  PostData,
  SelectedUserId,
  UserData,
} from "../lib/types";
import { postsBaseUrl, usersBaseUrl } from "../lib/constants";
import {
  getUsersStore,
  transformPostsData,
  transformUserData,
} from "../lib/utils";
import { useQueryUrlResource } from "./useQueryUrlResource";

// State type
interface State {
  selectedUserId: SelectedUserId;
}

// Action types
type Action = { type: "SET_SELECTED_USER_ID"; payload: SelectedUserId };

const initialState: State = {
  selectedUserId: null,
};

function appDataReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SELECTED_USER_ID":
      return {
        ...state,
        selectedUserId: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/**
 * Custom hook to fetch and manage posts and users data, and provide filtering functionality.
 *
 * @returns {Object} - An object containing:
 *  - {Data<T>} data: The fetched and filtered posts and users data.
 *  - {boolean} isLoading: Whether the data is currently being loaded.
 *  - {boolean} isError: Whether there was an error fetching the data.
 */
export function useQueryAppData() {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  // Use the custom hook to fetch users and posts data
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQueryUrlResource<UserData[]>(usersBaseUrl);
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQueryUrlResource<PostData[]>(postsBaseUrl);

  const users = useMemo(
    () => (usersData ? transformUserData(usersData) : []),
    [usersData]
  );
  const posts = useMemo(
    () =>
      postsData && usersData
        ? transformPostsData(getUsersStore(usersData), postsData)
        : [],
    [usersData, postsData]
  );

  const isLoading = isUsersLoading || isPostsLoading;
  const isError = isUsersError || isPostsError;

  // Memoized store object to compute the filtered posts and users based on the selected user ID
  const store = useMemo(() => {
    if (state.selectedUserId == null) return { posts, users };
    return {
      posts: posts
        .filter(({ userId }) => userId === state.selectedUserId)
        .sort((postA, postB) => postA.id - postB.id),
      users: users.filter(({ userId }) => userId === state.selectedUserId),
    };
  }, [state.selectedUserId, posts, users]);

  /**
   * Function to update the selected user ID for filtering posts.
   * Memoized with useCallback to prevent unnecessary re-renders.
   *
   * @param {SelectedUserId} userId - The user ID to set for filtering posts.
   */
  const updateSelectedUserId = useCallback((userId: SelectedUserId) => {
    dispatch({ type: "SET_SELECTED_USER_ID", payload: userId });
  }, []);

  const data: AppReducerData =
    isLoading || isError
      ? null
      : {
          posts,
          users,
          filteredUsers: store.users,
          filteredPosts: store.posts,
          selectedUserId: state.selectedUserId,
          updateSelectedUserId,
        };

  return {
    data,
    isLoading,
    isError,
  };
}
