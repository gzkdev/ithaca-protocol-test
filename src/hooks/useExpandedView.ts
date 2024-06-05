import { useCallback, useState, useEffect, MouseEvent } from "react";

/**
 * Custom hook to manage full-screen mode for a component.
 *
 * @returns {Object} - An object containing:
 *  - {boolean} fullScreenMode: Indicates if the component is in full-screen mode.
 *  - {Function} enterFullScreenMode: Function to enable full-screen mode.
 *  - {Function} leaveFullScreenMode: Function to disable full-screen mode.
 */
export function useExpandedView() {
  const [expandedView, setExpandedView] = useState(false);

  /**
   * Function to enter full-screen mode.
   * Wrapped in useCallback to ensure a stable reference between renders.
   *
   * @param {MouseEvent} e - The mouse event triggering the function.
   */
  const enterExpandedView = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setExpandedView(true);
  }, []);

  /**
   * Function to leave full-screen mode.
   * Wrapped in useCallback to ensure a stable reference between renders.
   *
   * @param {MouseEvent} e - The mouse event triggering the function.
   */
  const leaveExpandedView = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setExpandedView(false);
  }, []);

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = expandedView ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [expandedView]);

  return {
    expandedView,
    enterExpandedView,
    leaveExpandedView,
  };
}
