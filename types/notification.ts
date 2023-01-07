import { FC } from 'react';

import { IArticleSmall } from './article';
import { IBlogSmall } from './blog';

export type TNotification = 'ARTICLE_PUBLISHED' | 'COMMENT' | 'LIKE' | 'MESSAGE';
export type TNotificationStatus = 'UNREAD' | 'READ';

export interface INotification {
  id: number;
  type: TNotification;
  article: IArticleSmall;
  author: IBlogSmall;
  status: TNotificationStatus;
  createdDate: string;
  message?: string;
}

export type TNotificationComponent = FC<INotificationComponentProp>;

export interface INotificationComponentProp extends INotification {
  onClick?: (notification: INotification) => void;
  markAsRead?: (notification: INotification) => void;
  deleteNotification?: (notification: INotification) => void;
  loading?: boolean;
  className?: string;
}
