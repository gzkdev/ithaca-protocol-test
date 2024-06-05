import { useEffect, useState, MouseEvent } from "react";
import { Comment, Post } from "../lib/types";
import { commentsBaseUrl } from "../lib/constants";
import { fetchUrlResource } from "../lib/utils";
import { CloseIcon } from "../assets/icons";
import styles from "../styles/posts-list.module.css";

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

function PostItemFullScreen({
  post: { title, name, body, id },
  leaveFullScreenMode,
}: {
  post: Post;
  leaveFullScreenMode(e: React.MouseEvent): void;
}) {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const commentsUrl = `${commentsBaseUrl}?postId=${id}`;

  useEffect(() => {
    (async function fetchComments() {
      try {
        const commentsData = await fetchUrlResource<Array<Comment>>(
          commentsUrl
        );
        setComments(commentsData);
      } catch {
        throw new Error("Failed to fetch Comments");
      }
    })();
  }, []);

  return (
    <div className={styles.postItemFullScreen}>
      <div className={styles.postItemFullScreenContainer}>
        <button title="Close" onClick={leaveFullScreenMode}>
          <CloseIcon />
        </button>
        <div className={styles.postItemContent}>
          <div className={styles.postTitle}>{title}</div>
          <div className={styles.postUserName}>By {name}</div>
          <div className={styles.postBody}>{body}</div>
        </div>

        <div className={styles.postItemComments}>
          <header>Comments</header>
          <PostItemComments comments={comments} />
        </div>
      </div>
    </div>
  );
}

function PostItemComments({ comments }: { comments: Comment[] }) {
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
