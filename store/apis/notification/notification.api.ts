import { createApi } from '@reduxjs/toolkit/query/react';
import { INotification, IPagingResponse, TOptionalPagingRequest } from 'types';

import { baseQuery } from '../config';

export const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery('notification'),
  tagTypes: ['count', 'list'],
  endpoints: (build) => ({
    getByType: build.query<
      IPagingResponse<INotification>,
      TOptionalPagingRequest<{ type: string }>
    >({
      query: ({ type, page = 0 }) => `list?type=${type}&page=${page}`,
      providesTags: ['list'],
    }),
    read: build.mutation<void, number>({
      query: (id) => ({
        url: `read/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['count', 'list'],
    }),
    getBlogNotificationsCount: build.query<number, void>({
      query: () => `blog-notifications-count`,
      providesTags: ['count', 'list'],
    }),
    delete: build.mutation<void, number>({
      query: (id) => ({
        url: id.toString(),
        method: 'DELETE',
      }),
      invalidatesTags: ['count', 'list'],
    }),
    resetNotificationsCount: build.query<void, void>({
      query: () => 'reset-notifications-count',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          notificationApi.util.updateQueryData('getBlogNotificationsCount', undefined, () => 0),
        );
      },
    }),
  }),
});

export const {
  useLazyGetByTypeQuery: useLazyGetNotificationsByTypeQuery,
  useReadMutation: useReadNotificationMutation,
  useLazyGetBlogNotificationsCountQuery,
  useResetNotificationsCountQuery,
  useDeleteMutation: useDeleteNotificationMutation,
} = notificationApi;
