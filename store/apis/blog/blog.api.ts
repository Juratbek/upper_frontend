import { createApi } from '@reduxjs/toolkit/query/react';
import { IArticleResult, IBlog, IBlogMedium, ITelegramUser } from 'types';
import { Authorization } from 'variables';

import { baseQuery } from '../config';
import {
  IBlogLoginDto,
  IBlogRegisterDto,
  IBlogRegisterResponse,
  IChangeCredentiasDto,
  IChangeLoginDto,
  IChangePasswordDto,
} from './blog.types';

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
    getSidebarSuggestions: build.query<IBlogMedium[], void>({
      query: () => 'open/sidebar-suggestions',
    }),
    search: build.query<IBlogMedium[], string>({
      query: (search) => `open/search?search=${search}`,
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
    getById: build.query<IBlog, { id: number; token?: string | null }>({
      query: ({ id, token }) => ({
        url: `open/${id}`,
        headers: token
          ? {
              [Authorization]: `Bearer ${token}`,
            }
          : {},
      }),
    }),
    follow: build.mutation<void, number>({
      query: (id) => ({
        url: `follow/${id}`,
        method: 'POST',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          blogApi.util.updateQueryData('getById', { id }, (blog) => ({
            ...blog,
            isFollowed: true,
          })),
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
          blogApi.util.updateQueryData('getById', { id }, (blog) => ({
            ...blog,
            isFollowed: false,
          })),
        );
      },
    }),
    getPublishedArticles: build.query<IArticleResult[], number>({
      query: (id) => `open/published-articles/${id}`,
    }),
    getFollowers: build.query<IBlogMedium[], number>({
      query: (id) => `open/followers/${id}`,
    }),
    getNewToken: build.mutation<IBlogRegisterResponse, string>({
      query: (refreshToken) => ({
        url: 'open/get-token',
        method: 'POST',
        body: refreshToken,
        headers: {
          Authorization: '',
        },
      }),
    }),
    changePassword: build.mutation<void, IChangePasswordDto>({
      query: (passwords) => ({
        url: 'change-password',
        method: 'PUT',
        body: passwords,
      }),
    }),
    changeLogin: build.mutation<IBlogRegisterResponse, IChangeLoginDto>({
      query: (body) => ({
        url: 'change-login',
        method: 'PUT',
        body,
      }),
    }),
    sendEmailConfirmationForPassword: build.mutation<void, string>({
      query: (email) => ({
        url: 'open/forgot-credentials',
        body: email,
        method: 'POST',
      }),
    }),
    changeCredentials: build.mutation<IBlogRegisterResponse, IChangeCredentiasDto>({
      query: (body) => ({
        url: 'open/change-credentials',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetCurrentBlogQuery,
  useGetCurrentBlogQuery,
  useLazyGetPublishedArticlesQuery: useLazyGetBlogPublishedArticlesQuery,
  useUpdateMutation: useUpdateBlogMutation,
  useLazyGetSidebarSuggestionsQuery: useLazyGetSidebarBlogSuggestionsQuery,
  useLazySearchQuery: useLazySearchBlogQuery,
  useLazyGetCurrentBlogFollowersQuery: useLazyGetCurrentBlogFollowersQuery,
  useLazyGetByIdQuery: useLazyGetBlogByIdQuery,
  useFollowMutation: useFollowBlogMutation,
  useUnfollowMutation: useUnfollowBlogMutation,
  useLazyGetFollowersQuery: useLazyGetBlogFollowersQuery,
  useGoogleOneTapRegisterMutation,
  useLoginWithTelegramMutation,
  useChangePasswordMutation,
  useChangeLoginMutation,
  useSendEmailConfirmationForPasswordMutation,
  useChangeCredentialsMutation,
} = blogApi;
