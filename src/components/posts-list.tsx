import { ComponentStoreProp } from "../lib/types";
import styles from "../styles/posts.module.css";
import PostItem from "./post-item";

export default function PostsList({ posts }: ComponentStoreProp) {
  if (!posts) return;

  return (
    <div className={styles.postsListContainer}>
      {posts?.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}
