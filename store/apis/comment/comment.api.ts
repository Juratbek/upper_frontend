import { createApi } from '@reduxjs/toolkit/query/react';
import { IComment, IPagingResponse } from 'types';

import { baseQuery } from '../config';
import { TGetByArticleIdDto } from './comment.types';

export const commentApi = createApi({
  reducerPath: 'comment',
  baseQuery: baseQuery('comment'),
  endpoints: (build) => ({
    getByArticleId: build.query<IPagingResponse<IComment>, TGetByArticleIdDto>({
      query: ({ articleId, ...params }) => ({
        url: `open/${articleId}`,
        params,
      }),
    }),
    create: build.mutation<void, { articleId: number; text: string }>({
      query: (comment) => ({
        method: 'POST',
        url: 'create',
        body: comment,
      }),
    }),
  }),
});

export const {
  useLazyGetByArticleIdQuery: useLazyGetCommentsByArticleIdQuery,
  useCreateMutation: useCreateCommentMutation,
} = commentApi;
