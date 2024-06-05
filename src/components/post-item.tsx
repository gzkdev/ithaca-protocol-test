import { useEffect, useState, MouseEvent } from "react";
import { PostItemFullScreen } from "./posts-item-fullscreen";
import { Post } from "../lib/types";
import styles from "../styles/posts.module.css";

export default function PostItem({ post }: { post: Post }) {
  const { title, name, body } = post;
  const [fullScreenMode, setFullScreenMode] = useState(false);

  function enterFullScreenMode(e: MouseEvent) {
    e.preventDefault();
    setFullScreenMode(true);
  }

  function leaveFullScreenMode(e: MouseEvent) {
    e.stopPropagation();
    setFullScreenMode(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = fullScreenMode
      ? "hidden"
      : "auto";
  }, [fullScreenMode]);

  return (
    <div tabIndex={0} className={styles.postItem} onClick={enterFullScreenMode}>
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postUserName}>By {name}</div>
      <div className={styles.postBody}>{body}</div>

      {fullScreenMode && (
        <PostItemFullScreen
          post={post}
          leaveFullScreenMode={leaveFullScreenMode}
        />
      )}
    </div>
  );
}
