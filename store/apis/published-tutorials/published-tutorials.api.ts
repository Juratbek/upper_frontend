import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IPublishedTutorial,
  IPublishedTutorialMedim,
  IPublishedTutorialSmall,
  TOptionalPagingRequest,
} from 'types';

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
    getById: build.query<IPublishedTutorial, number>({
      query: (id) => `open/${id}`,
    }),
    getByArticleId: build.query<IPublishedTutorialSmall[], number>({
      query: (id) => ({
        url: `open/by-published-article-id/${id}`,
        params: {
          size: 2,
        },
      }),
    }),
  }),
});

export const {
  useLazySearchQuery: useLazySearchPublishedTutorialQuery,
  useLazyGetByIdQuery: useLazyGetPublishedTutorialByIdQuery,
  useLazyGetByArticleIdQuery: useLazyGetPublishedTutorialsByArticleIdQuery,
} = publishedTutorialApi;
