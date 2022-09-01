import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from './api.constants';
import { TBaseQuery } from './api.types';

export const baseQuery = (uri?: string): TBaseQuery =>
  fetchBaseQuery({
    baseUrl: `${BASE_URL}${uri && `/${uri}`}`,
  });
