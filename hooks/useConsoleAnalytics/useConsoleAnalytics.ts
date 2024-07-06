import { useEffect } from 'react';

import { isIgnoredError } from './useConsoleAnalytics.utils';

export const useConsoleAnalytics = () => {
  useEffect(() => {
    window.onload = function () {
      const originalConsoleError = console.error;

      console.error = function (...args) {
        const argsString = args.map((argument) => JSON.stringify(argument)).join(' ');
        const message = args[0];

        const isIgnored = isIgnoredError(message);
        if (!isIgnored) {
          const { location } = window;

          const error = {
            message,
            file: argsString,
            path: location.pathname + location.search,
          };

          gtag?.('event', 'console_error', error);
        }

        originalConsoleError(...args);
      };
    };
  }, []);
};
