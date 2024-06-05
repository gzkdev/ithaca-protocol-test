import { Suspense, useEffect, useState } from "react";
import { useQueryAppData } from "./hooks/useQueryAppData";
import PostsFilter from "./components/posts-filter";
import PostsSummary from "./components/posts-summary";
import PostsList from "./components/posts-list";

function App() {
  const { selectedUserId, updateSelectedUserId, users } = useQueryAppData();

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
          {/* <PostsSummary posts={filteredPosts} users={users} /> */}
          {/* <PostsList /> */}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
