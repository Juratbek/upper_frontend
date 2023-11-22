import { apiClient, TQueryHook, useQuery } from 'store/config';

import { ITelegramChannelConnectionStatusResponse } from './telegram.types';

export const useGetTelegramConnectionStatus: TQueryHook = (config) =>
  useQuery(
    'telegram-connection-status',
    () => apiClient.get('telegram/telegram-connection-status'),
    config,
  );

export const useGetTelegramChannelConnectionStatus: TQueryHook<
  ITelegramChannelConnectionStatusResponse
> = () =>
  useQuery('telegram-channel-connection-status', () =>
    apiClient.get('telegram/telegram-channel-connection-status'),
  );
