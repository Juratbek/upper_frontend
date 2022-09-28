import { createApi } from '@reduxjs/toolkit/query/react';
import { IArticleResult, IBlog, IBlogMedium } from 'types';

import { baseQuery } from '../config';
import { IBlogLoginDto, IBlogRegisterDto, IBlogRegisterResponse } from './blog.types';

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQuery('blog'),
  tagTypes: ['current-blog'],
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
    getCurrentBlog: build.query<IBlog, void>({
      query: () => 'get-current',
      providesTags: ['current-blog'],
    }),
    update: build.mutation<IBlogMedium, FormData>({
      query: (body) => ({
        url: 'update',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['current-blog'],
    }),
    getFollowers: build.query<IBlogMedium[], void>({
      query: () => 'current-blog-followers',
    }),
    getById: build.query<IBlog, number>({
      query: (id) => id.toString(),
    }),
    follow: build.mutation<void, number>({
      query: (id) => ({
        url: `follow/${id}`,
        method: 'POST',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          blogApi.util.updateQueryData('getById', id, (blog) => ({ ...blog, isFollowed: true })),
        );
      },
    }),
    unfollow: build.mutation<void, number>({
      query: (id) => ({
        url: `unfollow/${id}`,
        method: 'POST',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          blogApi.util.updateQueryData('getById', id, (blog) => ({ ...blog, isFollowed: false })),
        );
      },
    }),
    getBlogPublishedArticles: build.query<IArticleResult[], number>({
      query: (id) => `published-articles/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSetLabelsMutation,
  useLazyGetCurrentBlogQuery,
  useGetCurrentBlogQuery,
  useLazyGetBlogPublishedArticlesQuery,
  useUpdateMutation: useUpdateBlogMutation,
  useGetSidebarSuggestionsQuery: useGetSidebarBlogSuggestionsQuery,
  useLazySearchQuery: useLazySearchBlogQuery,
  useLazyGetFollowersQuery: useLazyGetCurrentBlogFollowersQuery,
  useLazyGetByIdQuery: useLazyGetBlogByIdQuery,
  useFollowMutation: useFollowBlogMutation,
  useUnfollowMutation: useUnfollowBlogMutation,
} = blogApi;
