import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ILabel } from 'types';

import { baseQuery } from '../config';

export const labelApi = createApi({
  reducerPath: 'label',
  baseQuery: baseQuery('label'),
  endpoints: (build) => ({
    getAll: build.query<ILabel[], void>({
      query: () => 'list',
    }),
    getAllByDirectionIds: build.query<ILabel[], number[]>({
      query: (ids) => ({
        url: 'by-direction',
        method: 'GET',
        params: {
          ids,
        },
      }),
    }),
  }),
});

export const {
  useGetAllQuery: useGetLabelsQuery,
  useLazyGetAllQuery: useLazyGetAllLabelsQuery,
  useLazyGetAllByDirectionIdsQuery: useLazyGetAllLabelsByDirectionIdsQuery,
} = labelApi;
