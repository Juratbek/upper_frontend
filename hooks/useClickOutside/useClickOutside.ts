/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  LegacyRef,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export const useClickOutside = (
  callBack?: () => void,
  exceptedElementIds: string[] = [],
): [LegacyRef<HTMLDivElement>, boolean] => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const exceptedElements = useMemo(() => {
    return exceptedElementIds.reduce<(HTMLElement | null)[]>(
      (elements, id) => [...elements, document.getElementById(id)],
      [],
    );
  }, [...exceptedElementIds]);

  const clickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    const clickedTarget = event.target;
    const currentTarget = ref.current;
    // @ts-ignore
    const doesElementContain = currentTarget?.contains(clickedTarget);
    setIsClickedOutside(!doesElementContain);
    if (doesElementContain) return;

    for (let i = 0; i < exceptedElements.length; i++) {
      const element = exceptedElements[i];
      // @ts-ignore
      const isExceptElement = element?.contains(clickedTarget);
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
