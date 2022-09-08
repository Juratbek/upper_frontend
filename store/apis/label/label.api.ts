import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ILabel } from 'types';
import { TOKEN } from 'variables';

import { BASE_URL } from '../config';

export const labelApi = createApi({
  reducerPath: 'label',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/label`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    get: build.query<ILabel[], any>({
      query: () => 'list',
    }),
  }),
});

export const { useGetQuery: useGetLabelsQuery } = labelApi;
