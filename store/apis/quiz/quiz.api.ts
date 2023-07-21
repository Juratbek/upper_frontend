import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../config';
import { IQuizSubmission, ISubmitQuizDto } from './quiz.api.types';

export const quizApi = createApi({
  reducerPath: 'quiz',
  baseQuery: baseQuery('quiz'),
  endpoints: (build) => ({
    submit: build.mutation<IQuizSubmission[], ISubmitQuizDto>({
      query: (block) => ({
        url: 'open/submit',
        body: block,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSubmitMutation: useSubmitQuizMutation } = quizApi;
