import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '../config';

export const tutorialApi = createApi({
  reducerPath: 'totorial',
  baseQuery: baseQuery('totorial'),
  endpoints: (build) => ({
    getAll: build.query({
      query: () => 'list',
    }),
  }),
});

export const { useLazyGetAllQuery: useLazyGetAllTutorialsQuery } = tutorialApi;
