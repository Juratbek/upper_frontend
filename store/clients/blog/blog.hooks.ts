import { UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { apiClient, useMutation, useQuery } from 'store/config';

import { IBlogRegisterResponse, ICurrentBlog } from './blog.types';

export const useGetCurrentBlog = () =>
  useQuery<ICurrentBlog>({
    queryKey: ['cuyrrent-blog'],
    queryFn: () => apiClient.get('blog/get-current'),
  });

export const useContinueWithGoogle = (
  options: UseMutationOptions<IBlogRegisterResponse, unknown, string>,
) =>
  useMutation<IBlogRegisterResponse, unknown, string>({
    mutationFn: (data) =>
      apiClient.post({
        path: 'blog/open/continue-with-google',
        body: data,
      }),
    ...options,
  });

export const useGetCurrentBlogTags = () => {
  const { isAuthenticated } = useAuth();
  return useQuery<string[]>({
    queryKey: ['blog-tags'],
    queryFn: () => apiClient.get('blog/current-blog-tags'),
    enabled: isAuthenticated ?? false,
  });
};

export const useUpdateBlog = () =>
  useMutation<void, unknown, FormData>({
    mutationFn: (blog) => apiClient.post({ path: 'blog/update', body: blog }),
  });

export const useGetAuthCode = () =>
  useQuery<string>({ queryKey: ['auth-code'], queryFn: () => apiClient.get('blog/get-auth-code') });
