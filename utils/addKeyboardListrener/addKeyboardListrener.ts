/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line simple-import-sort/imports
import { useEffect, useState, KeyboardEvent, KeyboardEventHandler } from 'react';

export const addKeyboardListener = (targetKey: string): boolean => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const downHandler: KeyboardEventHandler = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === targetKey) {
      setIsPressed(true);
    }
  };
  const upHandler: KeyboardEventHandler = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === targetKey) {
      setIsPressed(false);
    }
  };

  const eventListener = (): void => {
    // @ts-ignore
    window.addEventListener('keydown', downHandler);
    // @ts-ignore
    window.addEventListener('keyup', upHandler);
  };

  useEffect(() => {
    eventListener();
    return () => {
      eventListener();
    };
  }, []);
  return isPressed;
};
