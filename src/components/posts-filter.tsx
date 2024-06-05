import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useOnClickOutside";
import { SelectedUserId, User } from "../lib/types";
import styles from "../styles/posts-filter.module.css";

export default function PostsFilter({
  users,
  selectedUserId,
  updateSelectedUserId,
}: {
  users: User[];
  selectedUserId: SelectedUserId;
  updateSelectedUserId: (userId: SelectedUserId) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, closeDropDown);

  const filterName = selectedUserId
    ? users.find(({ userId }) => userId == selectedUserId)?.name
    : "All Posts";

  function toggleDropDown() {
    setOpen((previousValue) => !previousValue);
  }

  function closeDropDown() {
    setOpen(false);
  }

  function handleSelectUserId(userId: SelectedUserId) {
    return () => {
      updateSelectedUserId(userId);
      setOpen(false);
    };
  }

  return (
    <div ref={dropdownRef} className={styles.filter}>
      <button
        data-open={open}
        className={styles.trigger}
        onClick={toggleDropDown}
      >
        {filterName}
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown}>
          <button onClick={handleSelectUserId(null)}>All Posts</button>
          {users.map(({ name, userId }) => (
            <button key={userId} onClick={handleSelectUserId(userId)}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
