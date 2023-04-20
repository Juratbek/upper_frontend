import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../config';
export const subscriptionApi = createApi({
  reducerPath: 'change-subscription',
  baseQuery: baseQuery('subscription'),
});
