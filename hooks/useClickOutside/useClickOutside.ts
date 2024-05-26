import { Ref, useEffect, useRef, useState } from 'react';

export const useClickOutside = (
  callBack?: () => void,
  selector?: string,
): [Ref<HTMLDivElement>, boolean] => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = (event: MouseEvent) => {
    const clickedTarget = event.target as Element;
    const currentTarget = ref.current;

    if (selector) {
      const exceptedElementsNodeList = document.querySelectorAll(selector);
      for (const i in exceptedElementsNodeList) {
        const element = exceptedElementsNodeList[i];
        const isExceptElement = element?.contains?.(clickedTarget);
        if (isExceptElement) return;
      }
    }

    const doesElementContain = currentTarget?.contains?.(clickedTarget);
    setIsClickedOutside(!doesElementContain);
    if (doesElementContain) return;

    callBack?.();
  };

  useEffect(() => {
    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);

  return [ref, isClickedOutside];
};
