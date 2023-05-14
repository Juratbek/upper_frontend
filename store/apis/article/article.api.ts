import { createApi } from '@reduxjs/toolkit/query/react';
import { IArticle, IArticleResult, IPagingResponse, TOptionalPagingRequest } from 'types';
import { PAGINATION_SIZE } from 'variables';

import { baseQuery } from '../config';
import { create, update } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    create: create(build),
    update: update(build),
    getBlogArticleById: build.query<IArticle, number>({
      query: (id: number) => `need-auth/${id}`,
    }),
    getBlogArticles: build.query<IPagingResponse<IArticleResult>, TOptionalPagingRequest>({
      query: ({ page = 0 }) => `need-auth/list?page=${page}&size=${PAGINATION_SIZE}`,
    }),
    publish: build.mutation<IArticle, { id: number; notificationsOn: boolean }>({
      query: ({ id, ...body }) => ({
        url: `publish/${id}`,
        method: 'POST',
        body,
      }),
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
    search: build.query<IArticleResult[], { search: string }>({
      query: (params) => ({
        url: 'search',
        params,
      }),
    }),
  }),
});

export const {
  useCreateMutation: useCreateArticleMutation,
  useUpdateMutation: useUpdateArticleMutation,
  useDeleteMutation: useDeleteArticleMutation,
  useLazySearchQuery: useLazySearchArticleQuery,
  usePublishMutation,
  useLazyGetBlogArticlesQuery,
  useLazyGetBlogArticleByIdQuery,
} = articleApi;
