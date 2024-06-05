import { Comment } from "../lib/types";
import styles from "../styles/posts.module.css";

export function PostItemComments({ comments }: { comments: Comment[] }) {
  return (
    <div className={styles.postItemsGrid}>
      {comments.map(({ body, id, email }) => (
        <div key={id} className={styles.postItemComment}>
          <div>
            <span>{email}</span> commented
          </div>
          <div>{body}</div>
        </div>
      ))}
    </div>
  );
}
