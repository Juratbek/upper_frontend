import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IArticle } from 'types';

import { baseQuery } from '../config';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: baseQuery('article'),
  endpoints: (build) => ({
    save: build.mutation({
      query: (body) => ({
        url: 'create',
        body,
      }),
    }),
    publish: build.mutation({
      query: () => '',
    }),
    unpublish: build.mutation({
      query: () => '',
    }),
    republish: build.mutation({
      query: () => '',
    }),
    delete: build.mutation({
      query: () => '',
    }),
    restore: build.mutation({
      query: () => '',
    }),
    fullDelete: build.mutation({
      query: () => '',
    }),
    get: build.query<IArticle, number | undefined>({
      query: (id?: number) => id?.toString() || '',
    }),
  }),
});
