import { useEffect, useState } from 'react';

import { IUseClipboardProps } from './useClipboard.types';

export const useClipboard = (isReset?: boolean): IUseClipboardProps => {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isReset) {
      setIsCopied(false);
      setIsError(false);
      setIsLoading(false);
    }
  }, [isReset]);

  return {
    isCopied,
    isError,
    isLoading,
    writeText,
  };
};
