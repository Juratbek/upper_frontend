import {
  CommentNotification,
  LikeNotification,
  MessageNotification,
  PublishedArticleNotification,
} from 'components/notifications';
import { TNotification, TNotificationComponent, TNotificationStatus } from 'types';

export const NOTIFICATION_TYPES = {
  ARTICLE_PUBLISHED: 'ARTICLE_PUBLISHED',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
};

export const NOTIFICATIONS: Record<TNotification, TNotificationComponent> = {
  ARTICLE_PUBLISHED: PublishedArticleNotification,
  COMMENT: CommentNotification,
  LIKED: LikeNotification,
  MESSAGE: MessageNotification,
};

export const NOTIFICATION_STATUSES: Record<TNotificationStatus, TNotificationStatus> = {
  READ: 'READ',
  UNREAD: 'UNREAD',
};
