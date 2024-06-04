import { useEffect, useState } from "react";
import { fetchResource } from "../lib/utils";
import { commentsBaseUrl } from "../lib/constants";
import { RawPost } from "../lib/types";

export default function useFetchComments(postId: string) {
  const [comments, setComments] = useState<Array<RawPost>>([]);
  const commentsUrl = `${commentsBaseUrl}?postId=${postId}`;

  useEffect(() => {
    fetchResource(commentsUrl, setComments);
  }, [postId]);

  return comments;
}
