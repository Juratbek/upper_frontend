import { IUseAuth } from 'hooks';
import { apiClient, useMutation, useQuery } from 'store/config';

import { ReactionType } from './reaction.constants';

export const useHasReaction = ({
  articleId,
  isAuthenticated,
  type,
}: {
  articleId: number;
  isAuthenticated: IUseAuth['isAuthenticated'];
  type: ReactionType;
}) =>
  useQuery<{ hasReaction: boolean }>({
    queryKey: ['has-reaction', articleId, type],
    queryFn: () => apiClient.get(`reaction/has-reaction/${articleId}`, { type }),
    enabled: Boolean(articleId) && Boolean(isAuthenticated),
  });

export const useReactionCount = (articleId: number, type: ReactionType) =>
  useQuery<{ count: number }>({
    queryKey: ['like-count', articleId],
    queryFn: () => apiClient.get(`reaction/count/${articleId}`, { type }),
    enabled: Boolean(articleId),
  });

export const useReact = (articleId: number, type: ReactionType, onSuccess: VoidFunction) =>
  useMutation({
    mutationFn: () => apiClient.post({ path: `reaction/${articleId}`, body: { type } }),
    onSuccess,
  });
