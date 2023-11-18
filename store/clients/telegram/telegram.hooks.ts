import { apiClient, TQueryHook, useQuery } from 'store/config';

export const useGetTelegramConnectionStatus: TQueryHook = (config) =>
  useQuery(
    'telegram-connection-status',
    () => apiClient.get('telegram/telegram-connection-status'),
    config,
  );
