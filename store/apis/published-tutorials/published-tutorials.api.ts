import { createApi } from '@reduxjs/toolkit/query/react';
import { IPublishedTutorialMedim, TOptionalPagingRequest } from 'types';

import { baseQuery } from '../config';

export const publishedTutorialApi = createApi({
  reducerPath: 'published-tutorial',
  baseQuery: baseQuery('published-tutorial'),
  endpoints: (build) => ({
    search: build.query<IPublishedTutorialMedim[], TOptionalPagingRequest<{ search: string }>>({
      query: (params) => ({
        url: 'open/search',
        params,
      }),
    }),
  }),
});

export const { useLazySearchQuery: useLazySearchPublishedTutorialQuery } = publishedTutorialApi;
