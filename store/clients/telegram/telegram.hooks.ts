import { UseQueryOptions } from '@tanstack/react-query';
import { apiClient, useQuery } from 'store/config';

import { ITelegramChannelConnectionStatusResponse } from './telegram.types';

export const useGetTelegramConnectionStatus = (config: UseQueryOptions) =>
  useQuery({
    ...config,
    queryKey: ['telegram-connection-status'],
    queryFn: () => apiClient.get('telegram/telegram-connection-status'),
  });

export const useGetTelegramChannelConnectionStatus = () =>
  useQuery<ITelegramChannelConnectionStatusResponse>({
    queryKey: ['telegram-channel-connection-status'],
    queryFn: () => apiClient.get('telegram/telegram-channel-connection-status'),
  });
