import { QueryClientConfig } from '@tanstack/react-query';

export const queryClientDefaultOptions = {
  queries: {
    refetchOnWindowFocus: false, // default: true
  },
} satisfies QueryClientConfig['defaultOptions'];
