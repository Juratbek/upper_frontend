import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IPagingResponse, ITutorialMedium, TOptionalPagingRequest } from 'types';

import { baseQuery } from '../config';

export const tutorialApi = createApi({
  reducerPath: 'tutorial',
  baseQuery: baseQuery('tutorial'),
  endpoints: (build) => ({
    getAll: build.query<IPagingResponse<ITutorialMedium>, TOptionalPagingRequest>({
      query: () => 'list',
    }),
  }),
});

export const { useLazyGetAllQuery: useLazyGetAllTutorialsQuery } = tutorialApi;
