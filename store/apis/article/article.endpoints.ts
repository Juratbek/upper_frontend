import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import { IArticle } from 'types';

import { TBuild } from '../config';

export const articleEndpoints = (build: TBuild): EndpointDefinitions => ({
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
});
