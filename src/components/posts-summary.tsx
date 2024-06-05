import { Post, User } from "../lib/types";
import styles from "../styles/posts-summary.module.css";

export default function PostsSummary({
  users,
  posts,
}: {
  users: User[];
  posts: Post[];
}) {
  return (
    <div className={styles.container}>
      <div>{users.length} Users</div>•<div>{posts.length} Posts</div>
    </div>
  );
}
