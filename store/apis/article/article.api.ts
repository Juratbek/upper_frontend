import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticle, IArticleResult, TArticleStatus } from 'types';

import { baseQuery } from '../config';
import { create, incrementViewCount, likeDislike, update, updateStatus } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    create: create(build),
    update: update(build),
    updateStatus: updateStatus(build),
    likeDislike: likeDislike(build),
    incrementViewCount: incrementViewCount(build),
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
