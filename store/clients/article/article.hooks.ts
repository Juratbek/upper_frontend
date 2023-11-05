import { apiClient, TMutationHook, useMutation } from 'store/config';

export const useCreateArticle: TMutationHook<number> = (config) =>
  useMutation(
    ['create-article'],
    () =>
      apiClient.post<undefined, number>({
        path: 'article/create',
      }),
    config,
  );
