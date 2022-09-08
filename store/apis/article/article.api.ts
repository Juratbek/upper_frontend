import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TOKEN } from 'variables';

import { BASE_URL } from '../config';
import { articleEndpoints } from './article.endpoints';

export const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/article`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => articleEndpoints(build),
});
