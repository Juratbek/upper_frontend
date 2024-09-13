import { UseMutationOptions, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { IBlockData } from 'components/organisms';
import { apiClient, IMutationConfig, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IArticle, IArticleResult, IPagingResponse, TArticleStatus } from 'types';

export const useCreateArticle = (config: UseMutationOptions<{ id: IArticle['id'] }>) =>
  useMutation<{ id: IArticle['id'] }>({
    ...config,
    mutationFn: () =>
      apiClient.post({
        path: 'article/create',
      }),
  });

export const useArticleById = (id: number, config: Partial<UseQueryOptions<IArticle>>) =>
  useQuery<IArticle>({
    ...config,
    queryKey: ['article', id],
    queryFn: () => apiClient.get(`article/${id}`),
  });

export const usePreviewArticle = (id: IArticle['id']) =>
  useQuery<IArticle>({
    queryKey: ['preview-article', id],
    queryFn: () => apiClient.get(`article/preview/${id}`),
  });

export const useUpdateArticleBlocks = (id: number, config?: IMutationConfig<IBlockData[]>) =>
  useMutation<IBlockData[], unknown, { id: number; blocks: IBlockData[] }>({
    mutationKey: ['update-article', id],
    mutationFn: (article) =>
      apiClient.post({ path: `article/update-blocks/${id}`, body: article.blocks }),
    ...config,
  });

export const useBlogArticles = (status: TArticleStatus) =>
  useInfiniteQuery<IArticleResult>({
    queryKey: ['saved-articles', status],
    queryFn: (params) =>
      apiClient.get<IPagingResponse<IArticleResult>>('article/list', {
        status: status.toUpperCase(),
        page: params.pageParam.toString(),
        size: '10',
      }),
  });

export const usePublish = (
  id: number,
  config?: UseMutationOptions<{ publishedArticleId: number }>,
) =>
  useMutation<{ publishedArticleId: number }>({
    ...config,
    mutationKey: ['publish', id],
    mutationFn: () => apiClient.post({ path: `article/publish/${id}` }),
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
