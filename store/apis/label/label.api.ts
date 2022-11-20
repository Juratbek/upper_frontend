import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ILabel } from 'types';

import { baseQuery } from '../config';

export const labelApi = createApi({
  reducerPath: 'label',
  baseQuery: baseQuery('label'),
  endpoints: (build) => ({
    getAllByDirectionIds: build.query<ILabel[], number[]>({
      query: (ids) => ({
        url: 'by-direction',
        method: 'GET',
        params: {
          ids,
        },
      }),
    }),
    search: build.query<ILabel[], string>({
      query: (search) => `open/search?query=${search}`,
    }),
  }),
});

export const {
  useLazyGetAllByDirectionIdsQuery: useLazyGetAllLabelsByDirectionIdsQuery,
  useLazySearchQuery: useLazySearchLabelsQuery,
} = labelApi;
