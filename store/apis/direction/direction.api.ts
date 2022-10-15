import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IDirection } from 'types';

import { baseQuery } from '../config';

export const directionApi = createApi({
  reducerPath: 'direction',
  baseQuery: baseQuery('direction'),
  endpoints: (build) => ({
    getAll: build.query<IDirection[], void>({
      query: () => 'list',
    }),
    getByFieldId: build.query<IDirection[], number>({
      query: (id) => `by-field/${id}`,
    }),
  }),
});

export const {
  useGetAllQuery: useGetAllDirectionsQuery,
  useLazyGetByFieldIdQuery: useLazyGetDirectionsByFieldIdQuery,
  useGetByFieldIdQuery: useGetDirectionsByFieldIdQuery,
} = directionApi;
