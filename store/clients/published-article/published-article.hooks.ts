import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IArticle, IBlog, IPublishedArticleItem } from 'types';

export const usePublishedArticlesList = (label: string) => {
  return useInfiniteQuery<IPublishedArticleItem>({
    queryKey: ['published-articles', label],
    queryFn: (params) =>
      apiClient.get('published-article/get-by-label', {
        page: params.pageParam.toString(),
        size: '10',
        tag: label,
      }),
    enabled: typeof label === 'string',
  });
};

export const useBlogPublishedArticles = (id: IBlog['id']) =>
  useInfiniteQuery<IPublishedArticleItem>({
    queryKey: ['blog-published-articles', id],
    queryFn: ({ pageParam }) =>
      apiClient.get(`blog/published-articles/${id}`, { page: pageParam.toString() }),
  });

export const useIncrementViewCount = (article: Pick<IArticle, 'id' | 'token'> | null) =>
  useQuery<void, unknown, { id: number; token: string }>({
    queryKey: ['increment-view-count', article?.id],
    enabled: Boolean(article?.token),
    queryFn: () =>
      apiClient.post({
        path: `published-article/v2/has-updates/${article?.id}`,
        body: { token: article?.token },
      }),
  });

// query client from tanstack query is not working after refreshing. Yes sometimes it sucks
export const useLike = (articleId: number, onSuccess: VoidFunction) =>
  useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/like/${articleId}` }),
    onSuccess,
  });

export const useDislike = (articleId: number, onSuccess: VoidFunction) =>
  useMutation({
    mutationFn: () => apiClient.post({ path: `published-article/v2/dislike/${articleId}` }),
    onSuccess,
  });

export const useIsLiked = (articleId: number, isAuthenticated: boolean | null) =>
  useQuery({
    queryKey: ['is-liked', articleId],
    queryFn: () => apiClient.get(`like/is-liked/${articleId}`),
    enabled: Boolean(articleId) && Boolean(isAuthenticated),
  });

export const useIsDisliked = (articleId: number, isAuthenticated: boolean | null) =>
  useQuery({
    queryKey: ['is-disliked', articleId],
    queryFn: () => apiClient.get(`dislike/is-disliked/${articleId}`),
    enabled: Boolean(articleId) && Boolean(isAuthenticated),
  });

export const useLikeCount = (articleId: number) =>
  useQuery<{ count: number }>({
    queryKey: ['like-count', articleId],
    queryFn: () => apiClient.get(`like/count/${articleId}`),
    enabled: Boolean(articleId),
  });

export const useSearch = (value: string) =>
  useQuery<IPublishedArticleItem[]>({
    queryKey: ['search-published-article', value],
    queryFn: () => apiClient.get('published-article/search', { search: value, limit: '5' }),
    enabled: Boolean(value?.trim()),
  });
