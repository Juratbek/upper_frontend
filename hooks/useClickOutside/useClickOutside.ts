/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LegacyRef, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';

export const useClickOutside = (
  callBack?: () => void,
  selector?: string,
): [LegacyRef<HTMLDivElement>, boolean] => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    const clickedTarget = event.target;
    const currentTarget = ref.current;

    if (selector) {
      const exceptedElementsNodeList = document.querySelectorAll(selector);
      for (const i in exceptedElementsNodeList) {
        const element = exceptedElementsNodeList[i];
        // @ts-ignore
        const isExceptElement = element?.contains?.(clickedTarget);
        debugger;
        if (isExceptElement) return;
      }
    }

    // @ts-ignore
    const doesElementContain = currentTarget?.contains?.(clickedTarget);
    setIsClickedOutside(!doesElementContain);
    if (doesElementContain) return;

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
