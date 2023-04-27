import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../config';

export const subscriptionApi = createApi({
  reducerPath: 'subscription',
  baseQuery: baseQuery('subscription'),
  tagTypes: ['checkSubscription'],
  endpoints: (build) => ({
    subscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `subscribe/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['checkSubscription'],
    }),
    unSubscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `unsubscribe/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['checkSubscription'],
    }),
    checkSubscription: build.query({
      query: (id) => ({
        url: `check-subscription/${id}`,
      }),
      providesTags: ['checkSubscription'],
    }),
  }),
});
export const { useCheckSubscriptionQuery, useSubscribeMutation, useUnSubscribeMutation } =
  subscriptionApi;
