import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IArticleResult,
  IBlog,
  IBlogMedium,
  IBlogSmall,
  ILabel,
  ITelegramUser,
  TOptionalPagingRequest,
} from 'types';
import { Authorization } from 'variables';

import { baseQuery } from '../config';
import {
  IBlogDonatCredentialsDto,
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
    continueWithGoogle: build.mutation<IBlogRegisterResponse, string>({
      query: (token) => ({
        url: 'open/continue-with-google',
        method: 'POST',
        body: token,
      }),
    }),
    continueWithGitHub: build.mutation<IBlogRegisterResponse, string>({
      query: (code) => ({
        url: 'open/continue-with-github',
        method: 'POST',
        body: code,
      }),
    }),
    getTelegramAccountConnectedBlogs: build.mutation<IBlogSmall[], ITelegramUser>({
      query: (user) => ({
        url: 'open/telegram-connected-blogs',
        method: 'POST',
        body: user,
      }),
    }),
    loginWithTelegram: build.mutation<
      IBlogRegisterResponse,
      { blogId: number; telegramUser: ITelegramUser }
    >({
      query: ({ blogId, telegramUser }) => ({
        url: `open/login-with-telegram/${blogId}`,
        method: 'POST',
        body: telegramUser,
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
    search: build.query<IBlogMedium[], TOptionalPagingRequest<{ search: string }>>({
      query: (params) => ({
        url: `open/search`,
        params,
      }),
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
    getPublishedArticles: build.query<IArticleResult[], number>({
      query: (id) => `open/published-articles/${id}`,
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
    getByEmail: build.query<IBlogSmall[], string>({
      query: (email) => `open/by-email?email=${email}`,
    }),
    sendEmailConfirmationForPassword: build.mutation<void, { email: string; id: number }>({
      query: ({ id, email }) => ({
        url: `open/forgot-credentials/${id}?email=${email}`,
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
    changeDonatCredentials: build.mutation<void, IBlogDonatCredentialsDto | null>({
      query: (credentials) => ({
        url: 'change-donat-credentials',
        method: 'PUT',
        body: credentials || {},
      }),
    }),
    getDonatCredentials: build.query<IBlogDonatCredentialsDto, number>({
      query: (id) => `donat-credentials/${id}`,
    }),
    getCurrentBlogLabels: build.query<ILabel[], void>({
      query: () => 'current-blog-labels',
    }),
    getAuthCode: build.query<string, void>({
      query: () => 'get-auth-code',
    }),
  }),
});

export const {
  useGetCurrentBlogQuery,
  // lazy queries
  useLazyGetCurrentBlogQuery,
  useLazyGetCurrentBlogLabelsQuery,
  useLazyGetAuthCodeQuery,
  // renamed queries
  useLazyGetPublishedArticlesQuery: useLazyGetBlogPublishedArticlesQuery,
  useUpdateMutation: useUpdateBlogMutation,
  useLazyGetSidebarSuggestionsQuery: useLazyGetSidebarBlogSuggestionsQuery,
  useLazySearchQuery: useLazySearchBlogQuery,
  useLazyGetByIdQuery: useLazyGetBlogByIdQuery,
  useLazyGetDonatCredentialsQuery: useLazyGetBlogDonatCredentialsQuery,
  useLazyGetByEmailQuery: useLazyBlogsGetByEmailQuery,
  // mutations
  useChangePasswordMutation,
  useChangeLoginMutation,
  useSendEmailConfirmationForPasswordMutation,
  useChangeCredentialsMutation,
  useChangeDonatCredentialsMutation,
} = blogApi;
