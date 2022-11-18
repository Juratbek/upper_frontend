import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  IArticle,
  IArticleResult,
  IPagingResponse,
  TArticleStatus,
  TOptionalPagingRequest,
} from 'types';
import { PAGINATION_SIZE } from 'variables';

import { baseQuery } from '../config';
import { create, update, updateStatus } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    create: create(build),
    update: update(build),
    updateStatus: updateStatus(build),
    getById: build.query<IArticle, number>({
      query: (id: number) => id.toString(),
    }),
    getBlogArticleById: build.query<IArticle, number>({
      query: (id: number) => `need-auth/${id}`,
    }),
    getBlogArticles: build.query<
      IPagingResponse<IArticleResult[]>,
      TOptionalPagingRequest<{ statuses: TArticleStatus[] }>
    >({
      query: ({ statuses, page = 0 }) =>
        `need-auth/list?statuses=${statuses}&page=${page}&size=${PAGINATION_SIZE}`,
    }),
  }),
});

export const {
  useCreateMutation: useCreateArticleMutation,
  useUpdateMutation: useUpdateArticleMutaion,
  useUpdateStatusMutation: useUpdateArticleStatusMutation,
  useLazyGetByIdQuery: useLazyGetArticleByIdQuery,
  useLazyGetBlogArticlesQuery,
  useLazyGetBlogArticleByIdQuery,
} = articleApi;
