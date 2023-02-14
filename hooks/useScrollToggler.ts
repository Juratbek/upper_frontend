import { useEffect } from 'react';

const SCROLL_BAR_ON_CLASS = 'on-scrollbar';

export const useScrollToggler = (selector: string, shouldAddListener = true): void => {
  const handleScroll = (): ((e: Event) => void) => {
    let scrollTimeout: NodeJS.Timeout;

    return (e: Event): void => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains(SCROLL_BAR_ON_CLASS)) {
        target.classList.add(SCROLL_BAR_ON_CLASS);
      }
      window.clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        target.classList.remove(SCROLL_BAR_ON_CLASS);
      }, 1000);
    };
  };

  useEffect(() => {
    if (!shouldAddListener) return;

    const scrollBarCallback = handleScroll();
    document.querySelector(selector)?.addEventListener('scroll', scrollBarCallback);

    return () => {
      document.querySelector(selector)?.removeEventListener('scroll', scrollBarCallback);
    };
  }, [shouldAddListener]);
};
