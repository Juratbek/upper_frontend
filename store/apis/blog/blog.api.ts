import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN } from 'variables';

import { BASE_URL, TBaseQuery } from '../config';
import { IBlogRegisterDto, IBlogRegisterResponse } from './blog.types';

export const baseQuery = (uri?: string): TBaseQuery =>
  fetchBaseQuery({
    baseUrl: `${BASE_URL}${uri && `/${uri}`}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

export const blogApi = createApi({
  reducerPath: 'blog',
  baseQuery: baseQuery('blog'),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'search/users',
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
  }),
});

export const { useLoginMutation, useRegisterMutation, useSetLabelsMutation } = blogApi;
