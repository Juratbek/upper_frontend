import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ILabel } from 'types';

import { baseQuery } from '../config';

export const labelApi = createApi({
  reducerPath: 'label',
  baseQuery: baseQuery('label'),
  endpoints: (build) => ({
    get: build.query<ILabel[], string>({
      query: () => 'list',
    }),
  }),
});

export const { useGetQuery: useGetLabelsQuery } = labelApi;
