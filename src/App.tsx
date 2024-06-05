import { Suspense } from "react";
import { useQueryAppData } from "./hooks/useQueryAppData";
import PostsFilter from "./components/posts-filter";
import PostsSummary from "./components/posts-summary";
import PostsList from "./components/posts-list";

export default function App() {
  const { selectedUserId, updateSelectedUserId, store, users } =
    useQueryAppData();

  return (
    <div className="app">
      <div className="container">
        <h1>Posts</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostsFilter
            users={users}
            updateSelectedUserId={updateSelectedUserId}
            selectedUserId={selectedUserId}
          />
          <PostsSummary store={store} />
          <PostsList store={store} />
        </Suspense>
      </div>
    </div>
  );
}
