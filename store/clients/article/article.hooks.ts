import { OutputBlockData } from '@editorjs/editorjs';
import {
  apiClient,
  IMutationConfig,
  IMutationResult,
  IQeuryResult,
  IQueryConfig,
  TMutationHook,
  useMutation,
  useQuery,
} from 'store/config';
import { IArticle } from 'types';

export const useCreateArticle: TMutationHook<number> = (config) =>
  useMutation(
    ['create-article'],
    () =>
      apiClient.post<unknown, number>({
        path: 'article/create',
      }),
    config,
  );

export const useArticleById = (
  id: number,
  config: IQueryConfig<IArticle>,
): IQeuryResult<IArticle> =>
  useQuery(['article', id], () => apiClient.get(`article/need-auth/${id}`), config);

export const useUpdateArticleBlocks = (
  id: number,
  config?: IMutationConfig<OutputBlockData[]>,
): IMutationResult<OutputBlockData[], { id: number; blocks: OutputBlockData[] }> =>
  useMutation<OutputBlockData[], unknown, { id: number; blocks: OutputBlockData[] }>(
    ['update-article', id],
    (article) => apiClient.post({ path: `article/update-blocks/${id}`, body: article.blocks }),
    config,
  );
