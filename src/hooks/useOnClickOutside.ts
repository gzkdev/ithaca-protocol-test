import { useEffect } from "react";

/**
 * @function useClickOutside
 * @param {any} elementRef
 * @param {any} callback
 * @returns {void}
 * @description When you want to call a function when clicked outside the element Ex: DropDown PopUp
 */
export function useClickOutside(elementRef: any, callback: Function): void {
  function handleClick(e: MouseEvent) {
    if (elementRef.current && !elementRef.current.contains(e.target)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
