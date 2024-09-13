import { apiClient, useInfiniteQuery, useQuery } from 'store/config';
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
      apiClient.get(`published-article/by-blog/${id}`, { page: pageParam.toString(), size: '10' }),
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

export const useSearch = (value: string) =>
  useQuery<IPublishedArticleItem[]>({
    queryKey: ['search-published-article', value],
    queryFn: () =>
      apiClient.get('published-article/search', { search: value, size: '10', page: '0' }),
    enabled: Boolean(value?.trim()),
  });
