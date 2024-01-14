import React from 'react';
import { QueryClient } from 'react-query';
import { wrapper } from '../../store';

export const queryClient = new QueryClient();

export const ReduxDecorator = (Story) => {
  const StoryWithRedux = wrapper.withRedux(Story);

  return <StoryWithRedux />;
};
