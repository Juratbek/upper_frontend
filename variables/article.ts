import { TArticleStatus } from 'types';

export const ARTICLE_STATUSES: Record<TArticleStatus, TArticleStatus> = {
  PUBLISHED: 'PUBLISHED',
  DELETED: 'DELETED',
  UNPUBLISHED: 'UNPUBLISHED',
  SAVED: 'SAVED',
};
