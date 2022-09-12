import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticle, TArticleStatus } from 'types';

import { baseQuery } from '../config';
import { ICreateArticleDto } from './article.types';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    save: build.mutation<IArticle, ICreateArticleDto>({
      query: (body) => ({
        url: 'save',
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
    like: build.query<string, string>({
      query: (id) => id,
    }),
  }),
});

export const {
  useSaveMutation: useSaveArticleMutation,
  useUpdateStatusMutation: useUpdateArticleStatus,
  useLazyGetByIdQuery: useLazyGetArticleByIdQuery,
  useLazyGetBlogArticleByIdQuery,
} = articleApi;
