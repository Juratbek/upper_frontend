import { createApi } from '@reduxjs/toolkit/query/react';
import { IBlog } from 'types';
import { Authorization } from 'variables';

import { baseQuery } from '../config';

export const subscriptionApi = createApi({
  reducerPath: 'change-subscription',
  baseQuery: baseQuery('subscription'),
  tagTypes: ['current-blog', 'folowers'],
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
          subscriptionApi.util.updateQueryData('getIsSubscribed', { id }, (blog) => ({
            ...blog,
            isFollowed: true,
          })),
        );
      },
    }),
    unfollow: build.mutation<void, number>({
      query: (id) => ({
        url: `unfollow/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['folowers'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          subscriptionApi.util.updateQueryData('getIsSubscribed', { id }, (blog) => ({
            ...blog,
            isFollowed: false,
          })),
        );
      },
    }),
    getIsSubscribed: build.query<IBlog, { id: number; token?: string | null }>({
      query: ({ id, token }) => ({
        url: `check-subscription/${id}`,
        headers: token
          ? {
              [Authorization]: `Bearer ${token}`,
            }
          : {},
      }),
    }),
  }),
});
