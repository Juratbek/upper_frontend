import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticle, IArticleResult, TArticleStatus } from 'types';

import { baseQuery } from '../config';
import { ICreateArticleDto, IUpdateArticleDto } from './article.types';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    create: build.mutation<IArticle, ICreateArticleDto>({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
    }),
    update: build.mutation<IArticle, IUpdateArticleDto>({
      query: (body) => ({
        url: 'update',
        method: 'POST',
        body,
      }),
    }),
    updateStatus: build.mutation<number, { id: number; status: TArticleStatus }>({
      query: ({ id, status }) => ({
        url: `update-status/${id}`,
        method: 'POST',
        body: { status },
      }),
    }),
    fullDelete: build.mutation({
      query: () => '',
    }),
    getById: build.query<IArticle, number>({
      query: (id: number) => id.toString(),
    }),
    getBlogArticleById: build.query<IArticle, number>({
      query: (id: number) => `need-auth/${id}`,
    }),
    getBlogArticles: build.query<IArticleResult[], TArticleStatus[]>({
      query: (statuses) => `need-auth/list?statuses=${statuses}`,
    }),
    likeDislike: build.mutation<void, { id: number; value: -1 | 1 }>({
      query: ({ id, value }) => ({
        url: `like-dislike/${id}?value=${value}`,
        method: 'POST',
      }),
    }),
    incrementViewCount: build.mutation<void, number>({
      query: (id) => ({
        url: `increment-view-count/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateMutation: useCreateArticleMutation,
  useUpdateMutation: useUpdateArticleMutaion,
  useUpdateStatusMutation: useUpdateArticleStatusMutation,
  useLazyGetByIdQuery: useLazyGetArticleByIdQuery,
  useLazyGetBlogArticlesQuery,
  useLikeDislikeMutation,
  useLazyGetBlogArticleByIdQuery,
  useIncrementViewCountMutation,
} = articleApi;
