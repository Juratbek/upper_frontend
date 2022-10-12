import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IField } from 'types';

import { baseQuery } from '../config';

export const fieldApi = createApi({
  reducerPath: 'field',
  baseQuery: baseQuery('field'),
  endpoints: (build) => ({
    getAll: build.query<IField[], void>({
      query: () => 'list',
    }),
  }),
});

export const { useGetAllQuery } = fieldApi;
