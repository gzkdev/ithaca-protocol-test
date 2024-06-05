import { createPortal } from "react-dom";
import { CloseIcon } from "../assets/icons";
import { useQueryUrlResource } from "../hooks/useQueryUrlResource";
import { commentsBaseUrl } from "../lib/constants";
import { PostItemComments } from "./post-item-comments";
import { Post, Comment } from "../lib/types";
import styles from "../styles/posts.module.css";

/**
 * Component to display a full-screen view of a post with its comments.
 *
 * @param {Object} props - The props object.
 * @param {Post} props.post - The post data to be displayed.
 * @param {Function} props.leaveFullScreenMode - Function to exit full-screen mode.
 * @returns {JSX.Element} - The JSX element to render.
 */
export function PostItemFullScreen({
  post: { title, name, body, id },
  leaveFullScreenMode,
}: {
  post: Post;
  leaveFullScreenMode(e: React.MouseEvent): void;
}): JSX.Element {
  // Construct the URL to fetch comments for the given post ID
  const commentsUrl = `${commentsBaseUrl}?postId=${id}`;

  // Use the custom hook to fetch comments data
  const { data, isLoading, isError } =
    useQueryUrlResource<Comment[]>(commentsUrl);

  return createPortal(
    <div className={styles.postItemFullScreen}>
      <div className={styles.postItemFullScreenContainer}>
        <button title="Close" onClick={leaveFullScreenMode}>
          <CloseIcon />
        </button>

        {isLoading ? (
          <div className="info-view">
            <div title="Fetching data" className="loader" />
          </div>
        ) : isError ? (
          <div className="info-view">
            <div className="error">Failed to fetch data</div>
          </div>
        ) : (
          data && (
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
          )
        )}
      </div>
    </div>,
    document.getElementById("portal")!
  );
}
