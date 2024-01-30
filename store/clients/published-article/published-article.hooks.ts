import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IPublishedArticleItem } from 'types';

export const usePublishedArticlesList = (label: string) => {
  return useInfiniteQuery<IPublishedArticleItem>({
    queryKey: ['published-articles', label],
    queryFn: (params) =>
      apiClient.get('published-article/open/get-by-label', {
        page: params.pageParam.toString(),
        tag: label,
      }),
    enabled: typeof label === 'string',
  });
};

export const useIncrementViewCount = () =>
  useMutation<void, unknown, { id: number; token: string }>({
    mutationFn: ({ id, token }) =>
      apiClient.post({ path: `published-article/v2/open/has-updates/${id}`, body: { token } }),
  });

export const useLike = (articleId: number) =>
  useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/like/${articleId}` }),
  });

export const useDislike = (articleId: number) =>
  useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/dislike/${articleId}` }),
  });

export const useIsLikedOrDisliked = (articleId: number) =>
  useQuery({
    queryKey: ['liked-disliked', articleId],
    queryFn: () => apiClient.get(`published-article/v2/check-like-dislike/${articleId}`),
    enabled: Boolean(articleId),
  });

export const useLikeCount = (articleId: number) =>
  useQuery<number>({
    queryKey: ['like-count', articleId],
    queryFn: () => apiClient.get(`published-article/v2/open/like-count/${articleId}`),
    enabled: Boolean(articleId),
  });

export const useSearch = (value: string) =>
  useQuery<IPublishedArticleItem[]>({
    queryKey: ['search-published-article'],
    queryFn: () => apiClient.get('published-article/open/search', { search: value, limit: '5' }),
    enabled: Boolean(value?.trim()),
  });
