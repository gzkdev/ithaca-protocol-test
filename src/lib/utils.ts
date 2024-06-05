import { Post, PostData, User, UserData, UserStore } from "./types";

export async function fetchUrlResource<T>(
  url: string,
  options: RequestInit= {}
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as T;
}

export function getUsersStore(users: UserData[]): UserStore {
  const store: UserStore = {};
  users.forEach(({ id, name, username }) => {
    store[id] = { userId: id, name, username };
  });
  return store;
}

function getUserDetails(users: UserStore, userId: number): User {
  if (!users[userId]) throw new Error("User doesn't exist");
  return users[userId];
}

export function transformPostsData(
  users: UserStore,
  posts: PostData[]
): Post[] {
  return posts.map(({ body, id, title, userId }) => {
    return { body, id, title, ...getUserDetails(users, userId) };
  });
}

export function transformUserData(users: UserData[]): User[] {
  return users.map(({ id, name, username }) => {
    return { userId: id, name, username };
  });
}
