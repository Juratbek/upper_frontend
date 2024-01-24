import { OutputBlockData } from '@editorjs/editorjs';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { apiClient, IMutationConfig, useMutation, useQuery } from 'store/config';
import { IArticle, IArticleResult, IPagingResponse, IResponseError, TArticleStatus } from 'types';

export const useCreateArticle = (config: UseMutationOptions) =>
  useMutation({
    mutationFn: () =>
      apiClient.post<unknown, number>({
        path: 'article/create',
      }),
    ...config,
  });

export const useArticleById = (id: number, config: UseQueryOptions<IArticle>) =>
  useQuery<IArticle>({
    ...config,
    queryKey: ['article', id],
    queryFn: () => apiClient.get(`article/need-auth/${id}`),
  });

export const useUpdateArticleBlocks = (id: number, config?: IMutationConfig<OutputBlockData[]>) =>
  useMutation<OutputBlockData[], unknown, { id: number; blocks: OutputBlockData[] }>({
    mutationKey: ['update-article', id],
    mutationFn: (article) =>
      apiClient.post({ path: `article/update-blocks/${id}`, body: article.blocks }),
    ...config,
  });

export const useBlogArticles = (status: TArticleStatus, page: string) =>
  useQuery<IPagingResponse<IArticleResult>>({
    queryFn: ['saved-articles', status],
    queryKey: () =>
      apiClient.get<IPagingResponse<IArticleResult>>('article/need-auth/list', {
        status: status.toUpperCase(),
        page,
      }),
  });

export const usePublish = (id: number, config?: UseMutationOptions<number, IResponseError>) =>
  useMutation({
    mutationKey: ['publish', id],
    mutationFn: () => apiClient.post<void, number>({ path: `article/publish/${id}` }),
    ...config,
  });
