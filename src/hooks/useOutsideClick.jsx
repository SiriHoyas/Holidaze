import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook for detecting clicks outside of a specified element
 *
 * @param {function} callback - The function that is being fired when click is detected outside
 * @returns {Object} - A React ref object for the element being watched
 */
function useOutsideClick(callback) {
  const ref = useRef(null);

  const handleClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handleClick]);

  return ref;
}

export default useOutsideClick;
