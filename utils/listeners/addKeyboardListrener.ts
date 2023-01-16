import { TKeyNameType } from './addKeyboardListrener.types';

export const addKeyboardListener = (
  combinations: { targetKey: string; keyName: TKeyNameType },
  callback: (props: object) => void,
): { clear: () => void } => {
  function handeKeyboard(event: KeyboardEvent): void {
    if (combinations.keyName) {
      if (combinations.targetKey === event.key && event[combinations.keyName]) {
        callback(event);
      }
    } else if (combinations.targetKey === event.key) {
      callback(event);
    }
  }
  window.addEventListener('keydown', handeKeyboard);
  const clear = (): void => {
    window.removeEventListener('keydown', handeKeyboard);
  };
  return {
    clear,
  };
};
