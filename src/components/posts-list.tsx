import { ComponentStoreProp } from "../lib/types";
import PostItem from "./post-item";
import styles from "../styles/posts.module.css";

export default function PostsList({ posts }: ComponentStoreProp) {
  return (
    <div className={styles.postsListContainer}>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}
