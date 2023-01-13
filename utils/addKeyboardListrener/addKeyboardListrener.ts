export const addKeyboardListener = (
  combinations: { key: string; ctrl: boolean | null },
  callback: (props: object) => void,
): { clear: () => void } => {
  window.addEventListener('keydown', (event) => {
    if (combinations.ctrl === null) {
      if (event.key === combinations.key) {
        callback(event);
      }
    } else if (event.key === combinations.key && event.ctrlKey === combinations.ctrl) {
      callback(event);
    }
  });
  const clear = (): void => {
    window.removeEventListener('keydown', (event) => {
      if (combinations.ctrl === null) {
        if (event.key === combinations.key) {
          callback(event);
        }
      } else if (event.key === combinations.key && event.ctrlKey === combinations.ctrl) {
        callback(event);
      }
    });
  };
  return {
    clear,
  };
};
