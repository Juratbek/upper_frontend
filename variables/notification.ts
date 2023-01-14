import { CommentNotification } from 'components/CommentNotification/CommentNotification';
import { LikeNotification } from 'components/LikeNotification/LikeNotification';
import { MessageNotification } from 'components/MessageNotification/MessageNotification';
import { PublishedArticleNotification } from 'components/PublishedArticleNotification/PublishedArticleNotification';
import { NotificationsTab } from 'frontends/notifications';
import {
  ITabBody,
  ITabHeader,
  TNotification,
  TNotificationComponent,
  TNotificationStatus,
} from 'types';

const TAB_IDS = {
  all: 'all',
  subscriptions: 'subscriptions',
  comments: 'comments',
  likes: 'likes',
};

export const NOTIFICATIONS_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Barchasi',
    id: TAB_IDS.all,
  },
  // {
  //   name: 'Obunalar',
  //   id: TAB_IDS.subscriptions,
  // },
  // {
  //   name: 'Izohlar',
  //   id: TAB_IDS.comments,
  // },
  // {
  //   name: '"Yoqdi"lar',
  //   id: TAB_IDS.likes,
  // },
];

export const NOTIFICATIONS_TABS: ITabBody = {
  [TAB_IDS.all]: NotificationsTab,
  [TAB_IDS.subscriptions]: NotificationsTab,
  [TAB_IDS.comments]: NotificationsTab,
  [TAB_IDS.likes]: NotificationsTab,
};

export const NOTIFICATION_TYPES = {
  ARTICLE_PUBLISHED: 'ARTICLE_PUBLISHED',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
};

export const NOTIFICATIONS: Record<TNotification, TNotificationComponent> = {
  ARTICLE_PUBLISHED: PublishedArticleNotification,
  COMMENT: CommentNotification,
  LIKE: LikeNotification,
  MESSAGE: MessageNotification,
};

export const NOTIFICATION_STATUSES: Record<TNotificationStatus, TNotificationStatus> = {
  READ: 'READ',
  UNREAD: 'UNREAD',
};
