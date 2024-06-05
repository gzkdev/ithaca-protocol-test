import { AppReducerData } from "./lib/types";
import { useQueryAppData } from "./hooks/useQueryAppData";
import PostsFilter from "./components/posts-filter";
import PostsSummary from "./components/posts-summary";
import PostsList from "./components/posts-list";

/**
 * The main App component which fetches and displays posts and user data.
 * It handles loading and error states and delegates content rendering to the AppContent component.
 */
export default function App() {
  const { data, isLoading, isError } = useQueryAppData();

  return (
    <div className="app">
      <div className="container">
        {isLoading ? (
          <div className="info-view">
            <div title="Fetching data" className="loader" />
          </div>
        ) : isError ? (
          <div className="info-view">
            <div className="error">Failed to fetch data</div>
          </div>
        ) : (
          <AppContent data={data} />
        )}
      </div>
    </div>
  );
}

/**
 * AppContent component which receives the fetched data and displays it.
 * This component is responsible for rendering the posts filter, summary, and list.
 *
 * @param {Object} props - The props object.
 * @param {AppReducerData} props.data - The fetched and processed data to be displayed.
 * @returns {JSX.Element | null} - The JSX element to render or null if data is null.
 */
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
