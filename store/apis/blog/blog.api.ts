import { createApi } from '@reduxjs/toolkit/query/react';
import { IArticleResult, IBlog, IBlogMedium, ITelegramUser } from 'types';

import { baseQuery } from '../config';
import { IBlogLoginDto, IBlogRegisterDto, IBlogRegisterResponse } from './blog.types';

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQuery('blog'),
  tagTypes: ['current-blog'],
  endpoints: (build) => ({
    login: build.mutation<IBlogRegisterResponse, IBlogLoginDto>({
      query: (body) => ({
        url: 'open/login',
        method: 'POST',
        body,
      }),
    }),
    googleOneTapRegister: build.mutation<IBlogRegisterResponse, string>({
      query: (token) => ({
        url: 'open/google-one-tap-register',
        method: 'POST',
        body: token,
      }),
    }),
    loginWithTelegram: build.mutation<IBlogRegisterResponse, ITelegramUser>({
      query: (user) => ({
        url: 'open/login-with-telegram',
        method: 'POST',
        body: user,
      }),
    }),
    register: build.mutation<IBlogRegisterResponse, IBlogRegisterDto>({
      query: (blog) => ({
        url: 'open/register',
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
    getCurrentBlogFollowers: build.query<IBlogMedium[], void>({
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
    getPublishedArticles: build.query<IArticleResult[], number>({
      query: (id) => `published-articles/${id}`,
    }),
    getFollowers: build.query<IBlogMedium[], number>({
      query: (id) => `followers/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSetLabelsMutation,
  useLazyGetCurrentBlogQuery,
  useGetCurrentBlogQuery,
  useLazyGetPublishedArticlesQuery: useLazyGetBlogPublishedArticlesQuery,
  useUpdateMutation: useUpdateBlogMutation,
  useGetSidebarSuggestionsQuery: useGetSidebarBlogSuggestionsQuery,
  useLazySearchQuery: useLazySearchBlogQuery,
  useLazyGetCurrentBlogFollowersQuery: useLazyGetCurrentBlogFollowersQuery,
  useLazyGetByIdQuery: useLazyGetBlogByIdQuery,
  useFollowMutation: useFollowBlogMutation,
  useUnfollowMutation: useUnfollowBlogMutation,
  useLazyGetFollowersQuery: useLazyGetBlogFollowersQuery,
  useGoogleOneTapRegisterMutation,
  useLoginWithTelegramMutation,
} = blogApi;
