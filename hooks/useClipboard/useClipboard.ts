import { useEffect, useRef, useState } from 'react';

import { IUseClipboardProps } from './useClipboard.types';

interface ICOnfig {
  onError?: VoidFunction;
}

export const useClipboard = (config?: ICOnfig): IUseClipboardProps => {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const writeText = async (text: string): Promise<void> => {
    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (e) {
      setIsError(true);
      config?.onError?.();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCopied) {
      timeout.current = setTimeout(() => {
        setIsCopied(false);
        setIsError(false);
      }, 2000);
    }

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [isCopied]);

  return {
    isCopied,
    isError,
    isLoading,
    writeText,
  };
};
