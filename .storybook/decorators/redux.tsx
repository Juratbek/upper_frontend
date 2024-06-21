import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { store } from '../../store';
import { Provider } from 'react-redux';

export const queryClient = new QueryClient();

export const ReduxDecorator = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);
