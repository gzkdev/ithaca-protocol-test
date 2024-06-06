import { useRef } from "react";
import { useClickOutside } from "../hooks/useOnClickOutside";
import { SelectedUserId, User } from "../lib/types";
import { DropdownIcon } from "../assets/icons";
import { useToggleDropdown } from "../hooks/useToggleDropdown";
import styles from "../styles/posts.module.css";

export default function PostsFilter({
  users,
  selectedUserId,
  updateSelectedUserId,
}: {
  users: User[];
  selectedUserId: SelectedUserId;
  updateSelectedUserId: (userId: SelectedUserId) => void;
}) {
  const dropdownRef = useRef(null);

  const {
    open,
    filterName,
    toggleDropDown,
    closeDropDown,
    handleSelectUserId,
  } = useToggleDropdown(users, selectedUserId, updateSelectedUserId);

  useClickOutside(dropdownRef, closeDropDown);

  return (
    <div ref={dropdownRef} className={styles.postsFilter}>
      <button data-open={open} onClick={toggleDropDown}>
        {filterName}
        <DropdownIcon />
      </button>
      {open && (
        <div className={styles.postsDropdown}>
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
