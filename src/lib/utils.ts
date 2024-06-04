import { Post, PostData, User, UserData, UserStore } from "./types";

export async function fetchResource<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch {
    throw new Error(`Failed to fetch resource at ${url}`);
  }
}

export function getUsersStore(users: UserData[]): UserStore {
  const store: UserStore = {};
  users.forEach(({ id, name, username }) => {
    store[id] = { userId: id, name, username };
  });
  return store;
}

function getUserDetails(users: UserStore, userId: number): User {
  if (users[userId]) throw new Error("User doesn't exist");
  return users[userId];
}

export function getPostsWithUsers(users: UserStore, posts: PostData[]): Post[] {
  return posts.map(({ body, id, title, userId }) => {
    return { body, id, title, ...getUserDetails(users, userId) };
  });
}
