import { createApi } from '@reduxjs/toolkit/query/react';
import { IBlog } from 'types';
import { Authorization } from 'variables';

import { baseQuery } from '../config';

export const subscriptionApi = createApi({
  reducerPath: 'change-subscription',
  baseQuery: baseQuery('subscription'),
  tagTypes: ['folowers'],
  endpoints: (build) => ({
    subscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `subscribe/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['folowers'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          subscriptionApi.util.updateQueryData('checkSubscription', { id }, (blog) => ({
            ...blog,
            isFollowed: true,
          })),
        );
      },
    }),
    unSubscribe: build.mutation<void, number>({
      query: (id) => ({
        url: `unfollow/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['folowers'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          subscriptionApi.util.updateQueryData('checkSubscription', { id }, (blog) => ({
            ...blog,
            isFollowed: false,
          })),
        );
      },
    }),
    checkSubscription: build.query({
      query: (id) => ({
        url: `check-subscription/${id}`,
        invalidatesTags: ['folowers'],
      }),
    }),
  }),
});
export const { useCheckSubscriptionQuery, useSubscribeMutation, useUnSubscribeMutation } =
  subscriptionApi;
