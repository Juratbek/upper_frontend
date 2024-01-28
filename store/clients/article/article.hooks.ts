import { OutputBlockData } from '@editorjs/editorjs';
import { UseMutationOptions, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { apiClient, IMutationConfig, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IArticle, IArticleResult, IPagingResponse, TArticleStatus } from 'types';

export const useCreateArticle = (config: UseMutationOptions) =>
  useMutation({
    mutationFn: () =>
      apiClient.post<unknown, number>({
        path: 'article/create',
      }),
    ...config,
  });

export const useArticleById = (id: number, config: Partial<UseQueryOptions<IArticle>>) =>
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

export const useBlogArticles = (status: TArticleStatus) =>
  useInfiniteQuery<IArticleResult>({
    queryKey: ['saved-articles', status],
    queryFn: (params) =>
      apiClient.get<IPagingResponse<IArticleResult>>('article/need-auth/list', {
        status: status.toUpperCase(),
        page: params.pageParam.toString(),
      }),
  });

export const usePublish = (id: number, config?: UseMutationOptions<number>) =>
  useMutation({
    mutationKey: ['publish', id],
    mutationFn: () => apiClient.post<void, number>({ path: `article/publish/${id}` }),
    ...config,
  });

export const useUpdateLabels = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation<string[], unknown, string[]>({
    mutationFn: (tags) => apiClient.post({ path: `article/update-tags/${articleId}`, body: tags }),
    onSuccess: (newTags) =>
      queryClient.setQueryData(['article', articleId], (article: IArticle) => ({
        ...article,
        tags: newTags,
      })),
  });
};
