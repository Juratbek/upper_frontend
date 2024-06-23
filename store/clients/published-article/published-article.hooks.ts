import { apiClient, useInfiniteQuery, useMutation, useQuery } from 'store/config';
import { IArticle, IBlog, IPublishedArticleItem } from 'types';

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

export const useIncrementViewCount = (article: Pick<IArticle, 'id' | 'token'> | null) =>
  useQuery<void, unknown, { id: number; token: string }>({
    queryKey: ['increment-view-count', article?.id],
    enabled: Boolean(article?.token),
    queryFn: () =>
      apiClient.post({
        path: `published-article/v2/open/has-updates/${article?.id}`,
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
