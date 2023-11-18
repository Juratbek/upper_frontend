import { apiClient, TMutationHook, TQueryHook, useMutation, useQuery } from 'store/config';

import { IBlogRegisterResponse, ICurrentBlog } from './blog.types';

export const useGetCurrentBlog: TQueryHook<ICurrentBlog> = (config) =>
  useQuery<ICurrentBlog>('cuyrrent-blog', () => apiClient.get('blog/get-current'), config);

export const useContinueWithGoogle: TMutationHook<IBlogRegisterResponse, string> = (config) =>
  useMutation<IBlogRegisterResponse, unknown, string>(
    'continue-with-google',
    (data) =>
      apiClient.post({
        path: 'blog/open/continue-with-google',
        body: data,
      }),
    config,
  );

export const useGetCurrentBlogTags: TQueryHook<string[]> = () =>
  useQuery('blog-tags', () => apiClient.get<string[]>('blog/current-blog-tags'));

export const useUpdateBlog: TMutationHook<void, FormData> = () =>
  useMutation('update-blog', (blog) => apiClient.post({ path: 'blog/update', body: blog }));

export const useGetAuthCode: TQueryHook<string> = () =>
  useQuery('auth-code', () => apiClient.get('blog/get-auth-code'), { enabled: false });
