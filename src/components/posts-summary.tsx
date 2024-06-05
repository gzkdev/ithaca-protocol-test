import { PostsIcon, UsersIcon } from "../assets/icons";
import { ComponentStoreProp } from "../lib/types";
import styles from "../styles/posts-summary.module.css";

export default function PostsSummary({
  store: { posts, users },
}: ComponentStoreProp) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <UsersIcon />
        <span>{users.length} Users</span>
      </div>
      <div className={styles.box}>
        <PostsIcon />
        <span> {posts.length} Posts</span>
      </div>
    </div>
  );
}
