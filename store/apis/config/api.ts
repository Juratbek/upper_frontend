import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Authorization, TOKEN } from 'variables';

import { BASE_URL } from './api.constants';
import { TBaseQuery } from './api.types';

export const baseQuery = (uri?: string): TBaseQuery =>
  fetchBaseQuery({
    baseUrl: `${BASE_URL}${uri && `/${uri}`}`,
    prepareHeaders: (headers) => {
      try {
        const token = localStorage.getItem(TOKEN);
        const authorization = headers.get(Authorization);
        if (token && authorization === null) {
          headers.set(Authorization, `Bearer ${token}`);
        }
      } catch (e) {
        // console.error(e);
      }
      return headers;
    },
  });
