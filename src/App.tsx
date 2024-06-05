import { AppReducerData } from "./lib/types";
import { useQueryAppData } from "./hooks/useQueryAppData";
import PostsFilter from "./components/posts-filter";
import PostsSummary from "./components/posts-summary";
import PostsList from "./components/posts-list";

export default function App() {
  const { data, isLoading, isError } = useQueryAppData();

  return (
    <div className="app">
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div></div>
        ) : (
          <AppContent data={data} />
        )}
      </div>
    </div>
  );
}

function AppContent({ data }: { data: AppReducerData }) {
  if (data === null) return null;

  const {
    filteredPosts,
    filteredUsers,
    selectedUserId,
    updateSelectedUserId,
    users,
  } = data;

  return (
    <>
      <h1>Posts</h1>
      <PostsFilter
        users={users}
        updateSelectedUserId={updateSelectedUserId}
        selectedUserId={selectedUserId}
      />
      <PostsSummary posts={filteredPosts} users={filteredUsers} />
      <PostsList posts={filteredPosts} users={filteredUsers} />
    </>
  );
}
