import { PostsIcon, UsersIcon } from "../assets/icons";
import { ComponentStoreProp } from "../lib/types";
import styles from "../styles/posts.module.css";

export default function PostsSummary({ posts, users }: ComponentStoreProp) {
  return (
    <div className={styles.postsSummary}>
      <div className={styles.postSummaryStat}>
        <UsersIcon />
        <span>{users.length} Users</span>
      </div>
      <div className={styles.postSummaryStat}>
        <PostsIcon />
        <span> {posts.length} Posts</span>
      </div>
    </div>
  );
}
