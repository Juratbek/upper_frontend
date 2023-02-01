import { useEffect, useState } from 'react';
import { addKeyboardListeners } from 'utils';

export const useKeyboard = (targetKey: string): boolean => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const listener = addKeyboardListeners(
      [
        { key: targetKey, ctrlKey: true },
        { key: targetKey, metaKey: true },
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
