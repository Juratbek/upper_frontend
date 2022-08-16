/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LegacyRef, MouseEvent, MouseEventHandler, useEffect, useRef } from 'react';

export const useClickOutside = (callBack: () => void): LegacyRef<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    const clickedTarget = event.target;
    const currentTarget = ref.current;
    // @ts-ignore
    const doesElementContain = currentTarget?.contains(clickedTarget);
    if (doesElementContain) return;
    callBack();
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener('click', clickHandler);

    // @ts-ignore
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  return ref;
};
