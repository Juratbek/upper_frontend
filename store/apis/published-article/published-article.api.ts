import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  IArticle,
  IArticleResult,
  IPagingResponse,
  ISidebarArticle,
  TOptionalPagingRequest,
} from 'types';

import { baseQuery } from '../config';
import { TCheckIfLikedDisliked } from './published-article.api.types';

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
    getTop: build.query<IPagingResponse<IArticleResult>, TOptionalPagingRequest>({
      query: (params) => ({
        url: 'open/top-articles',
        params,
      }),
    }),
    likeDislike: build.mutation<void, { id: number; value: TCheckIfLikedDisliked }>({
      query: ({ id, value }) => ({
        url: `like-dislike/${id}?value=${value}`,
        method: 'POST',
      }),
      async onQueryStarted({ value, id }, { dispatch }) {
        dispatch(publishedArticleApi.util.updateQueryData('checkIfLikedDisliked', id, () => value));
      },
    }),
    checkIfLikedDisliked: build.query<number, number>({
      query: (id) => `check-like-dislike/${id}`,
    }),
    getById: build.query<IArticle, number>({
      query: (id: number) => `open/${id}`,
      keepUnusedDataFor: 15,
    }),
    incrementViewCount: build.mutation<void, { id: number; token: string }>({
      query: ({ id, token }) => ({
        url: `open/has-updates/${id}`,
        method: 'POST',
        body: token,
      }),
    }),
    search: build.query<IArticleResult[], string>({
      query: (search) => `open/search?search=${search}`,
    }),
  }),
});

export const {
  useLazyGetSidebarSuggestionsQuery: useLazyGetSidebarArticleSuggestionsQuery,
  useLazyGetSuggestionsQuery: useLazyGetArticleSuggestionsQuery,
  useLazyGetTopQuery: useLazyGetTopArticlesQuery,
  useLazyCheckIfLikedDislikedQuery,
  useLikeDislikeMutation,
  useIncrementViewCountMutation,
  useLazySearchQuery: useLazySearchArticleQuery,
} = publishedArticleApi;
