import { createApi } from '@reduxjs/toolkit/query/react';
import { IBlogMedium } from 'types';

import { baseQuery } from '../config';
import { IBlogLoginDto, IBlogRegisterDto, IBlogRegisterResponse } from './blog.types';

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQuery('blog'),
  endpoints: (build) => ({
    login: build.mutation<IBlogRegisterResponse, IBlogLoginDto>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<IBlogRegisterResponse, IBlogRegisterDto>({
      query: (blog) => ({
        url: 'register',
        method: 'POST',
        body: blog,
      }),
    }),
    setLabels: build.mutation<{ token: string }, number[]>({
      query: (labels) => ({
        url: 'set-labels',
        method: 'POST',
        body: labels,
      }),
    }),
    getSidebarSuggestions: build.query<IBlogMedium[], void>({
      query: () => 'sidebar-suggestions',
    }),
    search: build.query<IBlogMedium[], string>({
      query: (search) => `search?search=${search}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSetLabelsMutation,
  useGetSidebarSuggestionsQuery: useGetSidebarBlogSuggestionsQuery,
  useLazySearchQuery: useLazySearchBlogQuery,
} = blogApi;
