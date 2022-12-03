import { useCallback, useRef } from 'react';

type TCallBack = (...args: unknown[]) => void;

export const useInfiniteScroll = (cb?: TCallBack): ((node: Element | null) => void) => {
  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cb?.();
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return lastItemRef;
};
