import { useState } from 'react';

import { IUseClipboardProps } from './useClipboard.types';

interface ICOnfig {
  onError?: VoidFunction;
}

export const useClipboard = (config?: ICOnfig): IUseClipboardProps => {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const writeText = () => {
    let timeout: NodeJS.Timeout | undefined;

    return async (text: string): Promise<void> => {
      setIsLoading(true);
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
          setIsCopied(false);
          setIsError(false);
        }, 2000);
      } catch (e) {
        setIsError(true);
        config?.onError?.();
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    isCopied,
    isError,
    isLoading,
    writeText: writeText(),
  };
};
