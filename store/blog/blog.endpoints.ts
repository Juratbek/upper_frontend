import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';
import { TBuild } from 'store/api/api.types';

export const blogEndpoints = (build: TBuild): EndpointDefinitions => ({
  login: build.mutation({
    query: (body) => ({
      url: 'search/users',
      method: 'POST',
      body,
    }),
  }),
  register: build.mutation({
    query: (body) => ({
      url: 'search/users',
      method: 'POST',
      body,
    }),
  }),
});
