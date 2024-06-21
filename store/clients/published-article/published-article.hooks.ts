import { useQueryClient } from '@tanstack/react-query';
import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IBlog, IPublishedArticleItem } from 'types';

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

export const useBlogPublishedArticles = (id: IBlog['id']) =>
  useQuery<IPublishedArticleItem[]>({
    queryKey: ['blog-published-articles', id],
    queryFn: () => apiClient.get(`blog/open/published-articles/${id}`),
  });

export const useIncrementViewCount = () =>
  useMutation<void, unknown, { id: number; token: string }>({
    mutationFn: ({ id, token }) =>
      apiClient.post({ path: `published-article/v2/open/has-updates/${id}`, body: { token } }),
  });

export const useLike = (articleId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/like/${articleId}` }),
    onSuccess: () => {
      queryClient.setQueryData(['like-count', articleId], (likeCount: number) => likeCount + 1);
      queryClient.setQueryData(['liked-disliked', articleId], true);
    },
  });
  return mutation;
};

export const useDislike = (articleId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/dislike/${articleId}` }),
    onSuccess: () => {
      queryClient.setQueryData(['like-count', articleId], (likeCount: number) => likeCount - 1);
      queryClient.setQueryData(['liked-disliked', articleId], false);
    },
  });
  return mutation;
};

export const useIsLikedOrDisliked = (articleId: number, isAuthenticated: boolean | null) =>
  useQuery({
    queryKey: ['liked-disliked', articleId],
    queryFn: () => apiClient.get(`published-article/v2/check-like-dislike/${articleId}`),
    enabled: Boolean(articleId) && Boolean(isAuthenticated),
  });

export const useLikeCount = (articleId: number) =>
  useQuery<number>({
    queryKey: ['like-count', articleId],
    queryFn: () => apiClient.get(`published-article/v2/open/like-count/${articleId}`),
    enabled: Boolean(articleId),
  });

export const useSearch = (value: string) =>
  useQuery<IPublishedArticleItem[]>({
    queryKey: ['search-published-article', value],
    queryFn: () => apiClient.get('published-article/open/search', { search: value, limit: '5' }),
    enabled: Boolean(value?.trim()),
  });
