import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TOKEN } from 'variables';

import { BASE_URL } from './api.constants';
import { TBaseQuery } from './api.types';

export const baseQuery = (uri?: string): TBaseQuery =>
  fetchBaseQuery({
    baseUrl: `${BASE_URL}${uri && `/${uri}`}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN);
      console.log('🚀 ~ file: api.ts ~ line 12 ~ token', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
