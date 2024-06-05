import { PostItemExpandedView } from "./posts-item-fullscreen";
import { useExpandedView } from "../hooks/useExpandedView";
import { Post } from "../lib/types";
import styles from "../styles/posts.module.css";

export default function PostItem({ post }: { post: Post }) {
  const { title, name, body } = post;
  const { enterExpandedView, expandedView, leaveExpandedView } =
    useExpandedView();

  return (
    <div tabIndex={0} className={styles.postItem} onClick={enterExpandedView}>
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postUserName}>By {name}</div>
      <div className={styles.postBody}>{body}</div>

      {expandedView && (
        <PostItemExpandedView
          post={post}
          leaveFullScreenMode={leaveExpandedView}
        />
      )}
    </div>
  );
}
