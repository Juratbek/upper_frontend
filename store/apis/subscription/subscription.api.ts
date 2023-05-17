import { createApi } from '@reduxjs/toolkit/query/react';
import { IBlogMedium, IPagingResponse } from 'types';

import { baseQuery } from '../config';

export const subscriptionApi = createApi({
  reducerPath: 'subscription',
  baseQuery: baseQuery('subscription'),
  tagTypes: ['checkSubscription', 'subscribers'],
  endpoints: (build) => ({
    subscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `subscribe/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['checkSubscription', 'subscribers'],
    }),
    unSubscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `unsubscribe/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['checkSubscription', 'subscribers'],
    }),
    checkSubscription: build.query({
      query: (id) => ({
        url: `check-subscription/${id}`,
      }),
      providesTags: ['checkSubscription'],
    }),
    getSubscribers: build.query<
      IPagingResponse<IBlogMedium>,
      { id: number; page: number; size: number }
    >({
      query: ({ id, ...params }) => ({ url: `open/subscribers/${id}`, params }),
      providesTags: ['subscribers'],
    }),
  }),
});
export const {
  useCheckSubscriptionQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
  useLazyGetSubscribersQuery: useLazyGetBlogSubscribersQuery,
} = subscriptionApi;
