import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useOnClickOutside";
import { SelectedUserId, User } from "../lib/types";
import { DropdownIcon } from "../assets/icons";
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
        <DropdownIcon />
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
