import { useEffect, useMemo, useState } from "react";
import { Post, PostData, SelectedUserId, User, UserData } from "../lib/types";
import { postsBaseUrl, usersBaseUrl } from "../lib/constants";
import {
  getUsersStore,
  transformPostsData,
  transformUserData,
} from "../lib/utils";

async function fetchUrlResource<T>(url: string): Promise<Awaited<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function useQueryAppData() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUserId, setSelectedUserId] = useState<SelectedUserId>(null);

  const store = useMemo(() => {
    if (selectedUserId == null) return { posts, users };
    return {
      posts: posts.filter(({ userId }) => userId === selectedUserId),
      users: users.filter(({ userId }) => userId === selectedUserId),
    };
  }, [selectedUserId, posts, users]);

  function updateSelectedUserId(userId: SelectedUserId) {
    setSelectedUserId(userId);
  }

  useEffect(() => {
    (async function fetchResources() {
      try {
        const [usersData, postsData] = await Promise.all([
          await fetchUrlResource<UserData[]>(usersBaseUrl),
          await fetchUrlResource<PostData[]>(postsBaseUrl),
        ]);

        setUsers(transformUserData(usersData));
        setPosts(transformPostsData(getUsersStore(usersData), postsData));
      } catch {
        throw new Error("Failed to fetch resources");
      }
    })();
  }, []);

  return {
    posts,
    users,
    store,
    selectedUserId,
    updateSelectedUserId,
  };
}
