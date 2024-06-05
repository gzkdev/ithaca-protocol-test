import { PostsIcon, UsersIcon } from "../assets/icons";
import { Post, User } from "../lib/types";
import styles from "../styles/posts-summary.module.css";

type Prop = {
  store: {
    users: User[];
    posts: Post[];
  };
};

export default function PostsSummary({ store: { posts, users } }: Prop) {
  return (
    <div className={styles.container}>
      <div>
        <PostsIcon />
        {users.length} Users
      </div>
      <div>
        <UsersIcon />
        {posts.length} Posts
      </div>
    </div>
  );
}
