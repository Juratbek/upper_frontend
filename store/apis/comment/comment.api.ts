import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IComment } from 'types';

import { baseQuery } from '../config';

export const commentApi = createApi({
  reducerPath: 'comment',
  baseQuery: baseQuery('comment'),
  tagTypes: ['list'],
  endpoints: (build) => ({
    getByArticleId: build.query<IComment[], number>({
      query: (id) => `open/${id}`,
      providesTags: ['list'],
    }),
    create: build.mutation<void, { articleId: number; text: string }>({
      query: (comment) => ({
        method: 'POST',
        url: 'create',
        body: comment,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const {
  useLazyGetByArticleIdQuery: useLazyGetCommentsByArticleIdQuery,
  useCreateMutation: useCreateCommentMutation,
} = commentApi;
