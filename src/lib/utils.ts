import { Post, PostData, User, UserData, UserStore } from "./types";

/**
 * Fetches a resource from the specified URL.
 *
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to fetch the resource from.
 * @param {RequestInit} [options={}] - Optional fetch options.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws Will throw an error if the network response is not ok.
 */
export async function fetchUrlResource<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as T;
}

/**
 * Converts an array of user data into a UserStore object.
 *
 * @param {UserData[]} users - An array of user data.
 * @returns {UserStore} - A store object with user IDs as keys and user details as values.
 */
export function getUsersStore(users: UserData[]): UserStore {
  const store: UserStore = {};
  users.forEach(({ id, name, username }) => {
    store[id] = { userId: id, name, username };
  });
  return store;
}

/**
 * Retrieves the details of a user by user ID.
 *
 * @param {UserStore} users - The user store object.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {User} - The user details.
 * @throws Will throw an error if the user does not exist in the store.
 */
function getUserDetails(users: UserStore, userId: number): User {
  if (!users[userId]) throw new Error("User doesn't exist");
  return users[userId];
}

/**
 * Transforms post data by adding user details to each post.
 *
 * @param {UserStore} users - The user store object.
 * @param {PostData[]} posts - An array of post data.
 * @returns {Post[]} - An array of posts with user details included.
 */
export function transformPostsData(
  users: UserStore,
  posts: PostData[]
): Post[] {
  return posts.map(({ body, id, title, userId }) => {
    return { body, id, title, ...getUserDetails(users, userId) };
  });
}

/**
 * Transforms user data into a simpler user object format.
 *
 * @param {UserData[]} users - An array of user data.
 * @returns {User[]} - An array of simplified user objects.
 */
export function transformUserData(users: UserData[]): User[] {
  return users.map(({ id, name, username }) => {
    return { userId: id, name, username };
  });
}
