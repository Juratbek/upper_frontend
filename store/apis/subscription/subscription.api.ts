import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../config';

export const subscriptionApi = createApi({
  reducerPath: 'subscription',
  baseQuery: baseQuery('subscription'),
  endpoints: (build) => ({
    subscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `subscribe/${id}`,
        method: 'POST',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          subscriptionApi.util.updateQueryData('checkSubscription', id, (blog) => ({
            ...blog,
            isSubscribed: true,
          })),
        );
      },
    }),
    unSubscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `unsubscribe/${id}`,
        method: 'POST',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          subscriptionApi.util.updateQueryData('checkSubscription', id, (blog) => ({
            ...blog,
            isSubscribed: false,
          })),
        );
      },
    }),
    checkSubscription: build.query({
      query: (id) => ({
        url: `check-subscription/${id}`,
      }),
    }),
  }),
});
export const { useCheckSubscriptionQuery, useSubscribeMutation, useUnSubscribeMutation } =
  subscriptionApi;
