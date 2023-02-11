import { useEffect, useState } from 'react';
import { addKeyboardListeners } from 'utils';

export const useKeyboard = (targetKey: string, ctrlKey = true): boolean => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const listener = addKeyboardListeners(
      [
        { key: targetKey, ctrlKey },
        { key: targetKey, metaKey: ctrlKey },
      ],
      (event) => {
        event?.preventDefault();
        setIsKeyPressed(true);
      },
      () => setIsKeyPressed(false),
    );
    return listener.clear;
  }, []);

  return isKeyPressed;
};
