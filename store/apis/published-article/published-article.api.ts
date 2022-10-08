import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticle, IArticleResult, ISidebarArticle } from 'types';

import { baseQuery } from '../config';
import { TCheckIfLikedDisliked } from './published-article.api.types';

export const publishedArticleApi = createApi({
  reducerPath: 'published-article',
  baseQuery: baseQuery('published-article'),
  endpoints: (build) => ({
    getSidebarSuggestions: build.query<ISidebarArticle[], void>({
      query: () => 'sidebar-suggestions',
    }),
    getSuggestions: build.query<IArticleResult[], void>({
      query: () => 'suggestions',
    }),
    getTop: build.query<IArticleResult[], void>({
      query: () => 'top-articles',
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
      query: (id: number) => id.toString(),
      keepUnusedDataFor: 1,
    }),
    incrementViewCount: build.mutation<void, { id: number; token: string }>({
      query: ({ id, token }) => ({
        url: `increment-view-count/${id}?token=${token}`,
        method: 'POST',
        headers: {
          Authorization: '',
        },
      }),
    }),
    search: build.query<IArticleResult[], string>({
      query: (search) => `search?search=${search}`,
    }),
  }),
});

export const {
  useGetSidebarSuggestionsQuery: useGetSidebarArticleSuggestionsQuery,
  useGetSuggestionsQuery: useGetArticleSuggestionsQuery,
  useGetTopQuery: useGetTopArticlesQuery,
  useLazyCheckIfLikedDislikedQuery,
  useLikeDislikeMutation,
  useIncrementViewCountMutation,
  useLazySearchQuery: useLazySearchArticleQuery,
} = publishedArticleApi;
