import { useCallback, useMemo, useState } from "react";
import { SelectedUserId, User } from "../lib/types";

/**
 * Custom hook to manage the state and behavior of a dropdown for selecting users.
 *
 * @param {User[]} users - Array of user objects.
 * @param {SelectedUserId} selectedUserId - The currently selected user ID.
 * @param {Function} updateSelectedUserId - Function to update the selected user ID.
 * @returns {Object} An object containing state and functions to manage the dropdown.
 */
export function useToggleDropdown(
  users: User[],
  selectedUserId: SelectedUserId,
  updateSelectedUserId: (userId: SelectedUserId) => void
) {
  const [open, setOpen] = useState(false);

  // Memoized value to get the name of the selected user or default to "All Posts"
  const filterName = useMemo(() => {
    return selectedUserId
      ? users.find(({ userId }) => userId === selectedUserId)?.name ??
          "All Posts"
      : "All Posts";
  }, [selectedUserId, users]);

  const toggleDropDown = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const closeDropDown = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelectUserId = useCallback(
    (userId: SelectedUserId) => {
      return () => {
        updateSelectedUserId(userId);
        setOpen(false);
      };
    },
    [updateSelectedUserId]
  );

  return {
    open,
    filterName,
    toggleDropDown,
    closeDropDown,
    handleSelectUserId,
  };
}
