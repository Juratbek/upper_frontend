import { createApi } from '@reduxjs/toolkit/query/react';
import { ITelegramChannel } from 'types';

import { baseQuery } from '../config';
import { ITelegramChannelConnectionStatusResponse } from './telegram.api.types';

export const telegramApi = createApi({
  reducerPath: 'telegram',
  baseQuery: baseQuery('telegram'),
  endpoints: (build) => ({
    getTelegramConnectionStatus: build.query<boolean, void>({
      query: () => 'telegram-connection-status',
    }),
    getTelegramChannelConnectionStatus: build.query<ITelegramChannelConnectionStatusResponse, void>(
      {
        query: () => 'telegram-channel-connection-status',
      },
    ),
    getConnectedChannels: build.query<ITelegramChannel[], void>({
      query: () => 'connected-channels',
    }),
  }),
});

export const {
  useGetTelegramChannelConnectionStatusQuery,
  useGetConnectedChannelsQuery: useGetConnectedTelegramChannelsQuery,
  // lazy queries
  useLazyGetTelegramConnectionStatusQuery,
} = telegramApi;
