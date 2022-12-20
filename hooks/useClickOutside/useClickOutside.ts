/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LegacyRef, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';

export const useClickOutside = (
  callBack?: () => void,
  exceptElementId?: string,
): [LegacyRef<HTMLDivElement>, boolean] => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    const clickedTarget = event.target;
    const currentTarget = ref.current;
    // @ts-ignore
    const doesElementContain = currentTarget?.contains(clickedTarget);
    setIsClickedOutside(!doesElementContain);
    if (doesElementContain) return;
    if (exceptElementId) {
      const exceptElement = document.getElementById(exceptElementId);
      // @ts-ignore
      const isExceptElement = exceptElement?.contains(clickedTarget);
      if (isExceptElement) return;
    }
    callBack?.();
  };

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('click', clickHandler);

    // @ts-ignore
    return () => window.removeEventListener('click', clickHandler);
  }, []);

  return [ref, isClickedOutside];
};
