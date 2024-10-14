import { UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { apiClient, useMutation, useQuery } from 'store/config';

import { IBlogRegisterResponse, ICurrentBlog } from './blog.types';

export const useGetCurrentBlog = () =>
  useQuery<ICurrentBlog>({
    queryKey: ['current-blog'],
    queryFn: () => apiClient.get('blog/get-current'),
    retry: false,
  });

export const useContinueWithGoogle = (
  options: UseMutationOptions<IBlogRegisterResponse, unknown, string>,
) =>
  useMutation<IBlogRegisterResponse, unknown, string>({
    mutationFn: (data) =>
      apiClient.post({
        path: 'auth/continue-with-google',
        body: { token: data },
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
