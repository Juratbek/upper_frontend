import { createApi } from '@reduxjs/toolkit/query/react';

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
  }),
});

export const { useLoginMutation, useRegisterMutation, useSetLabelsMutation } = blogApi;
