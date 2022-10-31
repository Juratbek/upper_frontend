import { useEffect, useState } from 'react';

export const useShortCut = (targetKey: string): boolean => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  function onKeyDown(e: KeyboardEvent): void {
    if ((e.metaKey || e.ctrlKey) && e.key === targetKey) {
      e.preventDefault();
      setIsKeyPressed(true);
    }
  }

  function onKeyUp(): void {
    setIsKeyPressed(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);
  return isKeyPressed;
};
