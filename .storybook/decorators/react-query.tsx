import React from 'react';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

export const ReactQueryDecorator = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);
