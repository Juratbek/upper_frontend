import { Article } from 'components/Article/Article';
import { CommentNotification } from 'components/CommentNotification/CommentNotification';
import { LikeNotification } from 'components/LikeNotification/LikeNotification';
import { NotificationsTab } from 'frontends/notifications';
import { INotifications, ITabBody, ITabHeader } from 'types';

import { ACTION_TYPES } from './common';

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
  article: 'article',
  comment: 'comment',
  like: 'like',
};

export const NOTIFICATIONS: INotifications = {
  [NOTIFICATION_TYPES.article]: {
    component: Article,
    actions: [ACTION_TYPES.delete, ACTION_TYPES.markAsRead],
  },
  [NOTIFICATION_TYPES.comment]: {
    component: CommentNotification,
    actions: [ACTION_TYPES.delete, ACTION_TYPES.markAsRead],
  },
  [NOTIFICATION_TYPES.like]: {
    component: LikeNotification,
    actions: [ACTION_TYPES.delete, ACTION_TYPES.markAsRead],
  },
};
