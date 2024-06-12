import { useState, useCallback } from 'react';

/**
 * useModal - A custom hook for handling the open/close state of a modal.
 *
 * @return {Object} An object containing 'isShowing', 'toggle', 'open', and 'close' properties.
 */
function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  // Toggle the visibility of the modal
  const toggle = useCallback(() => {
    setIsShowing(!isShowing);
  }, [isShowing]);

  // Open the modal
  const open = useCallback(() => {
    setIsShowing(true);
  }, []);

  // Close the modal
  const close = useCallback(() => {
    setIsShowing(false);
  }, []);

  return {
    isShowing,
    toggle,
    open,
    close,
  };
}

export default useModal;
