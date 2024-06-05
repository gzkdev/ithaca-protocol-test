import { useEffect, useState, Suspense } from "react";
import { Comment, Post } from "../lib/types";
import { commentsBaseUrl } from "../lib/constants";
import { fetchUrlResource } from "../lib/utils";
import styles from "../styles/posts-list.module.css";

export default function PostItem({ post }: { post: Post }) {
  const { title, name, body } = post;
  const [fullScreenMode, setFullScreenMode] = useState(false);

  function toggleFullScreenMode() {
    setFullScreenMode((isfullScreen) => !isfullScreen);
  }

  useEffect(() => {
    document.body.style.overflow = fullScreenMode ? "hidden" : "auto";
  }, [fullScreenMode]);

  return (
    <div
      tabIndex={0}
      className={styles.postItem}
      onClick={toggleFullScreenMode}
    >
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postUserName}>By {name}</div>
      <div className={styles.postBody}>{body}</div>

      {fullScreenMode && (
        <PostItemFullScreen
          post={post}
          toggleFullScreenMode={toggleFullScreenMode}
        />
      )}
    </div>
  );
}

function PostItemFullScreen({
  post: { title, name, body, id },
  toggleFullScreenMode,
}: {
  post: Post;
  toggleFullScreenMode(): void;
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
        <button onClickCapture={toggleFullScreenMode}>Close</button>
        <div className={styles.postItemContent}>
          <div className={styles.postTitle}>{title}</div>
          <div className={styles.postUserName}>By {name}</div>
          <div className={styles.postBody}>{body}</div>
        </div>

        <div className={styles.postItemComments}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostItemComments comments={comments} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function PostItemComments({ comments }: { comments: Comment[] }) {
  return (
    <div>
      {comments.map(({ body, id, name }) => (
        <div key={id} style={{ margin: "40px 0" }}>
          <div>{name} commented</div>
          <div>{body}</div>
        </div>
      ))}
    </div>
  );
}
