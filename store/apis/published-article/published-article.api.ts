import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IArticle,
  IArticleResult,
  IPagingResponse,
  ISidebarArticle,
  TOptionalPagingRequest,
} from 'types';

import { baseQuery } from '../config';

export const publishedArticleApi = createApi({
  reducerPath: 'published-article',
  baseQuery: baseQuery('published-article'),
  endpoints: (build) => ({
    getSidebarSuggestions: build.query<ISidebarArticle[], void>({
      query: () => 'open/sidebar-suggestions',
    }),
    getSuggestions: build.query<IPagingResponse<IArticleResult>, TOptionalPagingRequest>({
      query: (params) => ({
        url: 'open/suggestions',
        params,
      }),
    }),
    getByLabel: build.query<IPagingResponse<IArticleResult>, TOptionalPagingRequest>({
      query: (params) => ({
        url: 'open/get-by-label',
        params,
      }),
    }),
    getTop: build.query<
      IPagingResponse<IArticleResult>,
      TOptionalPagingRequest<{ labelId?: number }>
    >({
      query: (params) => ({
        url: 'open/top-articles',
        params,
      }),
    }),
    like: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `v2/like/${id}`,
        method: 'POST',
      }),
      async onQueryStarted({ id }, { dispatch }) {
        dispatch(publishedArticleApi.util.updateQueryData('checkIfLikedDisliked', id, () => true));
      },
    }),
    dislike: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `v2/dislike/${id}`,
        method: 'POST',
      }),
      async onQueryStarted({ id }, { dispatch }) {
        dispatch(publishedArticleApi.util.updateQueryData('checkIfLikedDisliked', id, () => false));
      },
    }),
    checkIfLikedDisliked: build.query<boolean | null, number>({
      query: (id) => `v2/check-like-dislike/${id}`,
    }),
    getById: build.query<IArticle, { id: number; withAuthor?: boolean }>({
      query: ({ id, ...params }) => ({
        url: `open/${id}`,
        params,
      }),
      keepUnusedDataFor: 15,
    }),
    incrementViewCount: build.mutation<void, { id: number; token: string }>({
      query: ({ id, token }) => ({
        url: `v2/open/has-updates/${id}`,
        method: 'POST',
        body: token,
      }),
    }),
    search: build.query<IArticleResult[], TOptionalPagingRequest<{ search: string }>>({
      query: (params) => ({
        url: 'open/search',
        params,
      }),
    }),
    searchCurrentBlogArticles: build.query<
      IArticleResult[],
      TOptionalPagingRequest<{ search: string; statuses: string }>
    >({
      query: (params) => ({
        url: 'search-current-blog-articles',
        params,
      }),
    }),
    getMediumArticleById: build.query<IArticleResult, number>({
      query: (id) => `medium/${id}`,
    }),
  }),
});

export const {
  useLazyGetSidebarSuggestionsQuery: useLazyGetSidebarArticleSuggestionsQuery,
  useLazyGetSuggestionsQuery: useLazyGetArticleSuggestionsQuery,
  useLazyGetTopQuery: useLazyGetTopArticlesQuery,
  useLazyCheckIfLikedDislikedQuery,
  useLikeMutation,
  useDislikeMutation,
  useIncrementViewCountMutation,
  useLazySearchQuery: useLazySearchPublishedArticleQuery,
  useLazyGetByLabelQuery: useLazyGetPublishedArticlesByLabelQuery,
  useLazySearchCurrentBlogArticlesQuery: useLazySearchCurrentBlogPublishedArticlesQuery,
  useLazyGetMediumArticleByIdQuery: useLazyGetMediumPublishedArticleByIdQuery,
} = publishedArticleApi;
