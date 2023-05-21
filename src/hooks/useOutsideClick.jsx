import { useCallback, useEffect, useRef } from "react";

/**
 *
 * @param {*} callback
 * @returns
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
