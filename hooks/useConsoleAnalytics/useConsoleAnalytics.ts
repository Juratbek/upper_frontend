import { useEffect } from 'react';

export const useConsoleAnalytics = () => {
  useEffect(() => {
    window.onload = function () {
      const originalConsoleError = console.error;

      console.error = function (...args) {
        const argsString = args.map((argument) => JSON.stringify(argument)).join(' ');
        const message = args[0];

        const { location } = window;

        const error = {
          message,
          file: argsString,
          path: location.pathname + location.search,
        };

        originalConsoleError(...args);

        gtag('event', 'console_error', error);
      };
    };
  }, []);
};
