import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ISidebarArticle } from 'types';

import { baseQuery } from '../config';

export const publishedArticleApi = createApi({
  reducerPath: 'published-article',
  baseQuery: baseQuery('published-article'),
  endpoints: (build) => ({
    getSidebarSuggestions: build.query<ISidebarArticle[], void>({
      query: () => 'sidebar-suggestions',
    }),
  }),
});

export const { useGetSidebarSuggestionsQuery: useGetSidebarArticleSuggestionsQuery } =
  publishedArticleApi;
