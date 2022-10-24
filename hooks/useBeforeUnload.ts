import { useEffect } from 'react';

export const useBeforeUnload = (): void => {
  const onBeforeUnload = (e: Event): void => {
    e.preventDefault();
    e.returnValue = true;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return (): void => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);
};
