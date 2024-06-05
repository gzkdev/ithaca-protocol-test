import { createPortal } from "react-dom";
import { CloseIcon } from "../assets/icons";
import { useQueryUrlResource } from "../hooks/useQueryUrlResource";
import { commentsBaseUrl } from "../lib/constants";
import { PostItemComments } from "./post-item-comments";
import { Post, Comment } from "../lib/types";
import styles from "../styles/posts.module.css";

export function PostItemFullScreen({
  post: { title, name, body, id },
  leaveFullScreenMode,
}: {
  post: Post;
  leaveFullScreenMode(e: React.MouseEvent): void;
}) {
  const commentsUrl = `${commentsBaseUrl}?postId=${id}`;
  const { data, isLoading, isError } =
    useQueryUrlResource<Comment[]>(commentsUrl);

  return createPortal(
    <div className={styles.postItemFullScreen}>
      <div className={styles.postItemFullScreenContainer}>
        <button title="Close" onClick={leaveFullScreenMode}>
          <CloseIcon />
        </button>
        {isError && (
          <div className={styles.error}>Failed to fetch comments</div>
        )}
        {isLoading && <div className={styles.loader} />}

        {data && (
          <>
            <div className={styles.postItemContent}>
              <div className={styles.postTitle}>{title}</div>
              <div className={styles.postUserName}>By {name}</div>
              <div className={styles.postBody}>{body}</div>
            </div>
            <div className={styles.postItemComments}>
              <header>Comments</header>
              <PostItemComments comments={data} />
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById("portal")!
  );
}
