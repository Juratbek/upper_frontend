import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticleResult, ISidebarArticle } from 'types';

import { baseQuery } from '../config';

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
    likeDislike: build.mutation<void, { id: number; value: -1 | 1 }>({
      query: ({ id, value }) => ({
        url: `like-dislike/${id}?value=${value}`,
        method: 'POST',
      }),
    }),
    checkIfLikedDisliked: build.query<number, number>({
      query: (id) => `check-like-dislike/${id}`,
    }),
  }),
});

export const {
  useGetSidebarSuggestionsQuery: useGetSidebarArticleSuggestionsQuery,
  useGetSuggestionsQuery: useGetArticleSuggestionsQuery,
  useGetTopQuery: useGetTopArticlesQuery,
  useLazyCheckIfLikedDislikedQuery,
  useLikeDislikeMutation,
} = publishedArticleApi;
