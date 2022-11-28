import { useEffect, useRef, useState } from 'react';

import { IUseClipboardProps } from './useClipboard.types';

export const useClipboard = (): IUseClipboardProps => {
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
