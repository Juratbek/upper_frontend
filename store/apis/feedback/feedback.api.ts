import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../config';
import { ICreateFeedbackDto } from './feedback.types';

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  baseQuery: baseQuery('feedback'),
  endpoints: (build) => ({
    create: build.mutation<void, ICreateFeedbackDto>({
      query: (feedback) => ({
        method: 'POST',
        url: 'open/create',
        body: feedback,
      }),
    }),
  }),
});

export const { useCreateMutation: useCreateFeedbackMutation } = feedbackApi;
