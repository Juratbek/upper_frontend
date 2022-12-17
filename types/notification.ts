import { ICommentNotificationProps } from 'components/CommentNotification/CommentNotification.types';
import { ILikeNotificationProps } from 'components/LikeNotification/LikeNotification.types';
import { IPublishedArticleNotificationProps } from 'components/PublishedArticleNotification/PublishedArticleNotification.types';
import { FC } from 'react';

import { IArticleSmall } from './article';
import { IBlogSmall } from './blog';

export type TNotification = 'ARTICLE_PUBLISHED' | 'COMMENT' | 'LIKE';
export type TNotificationStatus = 'UNREAD' | 'READ';

export interface INotification {
  id: number;
  type: TNotification;
  article: IArticleSmall;
  author: IBlogSmall;
  status: TNotificationStatus;
  createdDate: string;
}

export type TNotificationComponent =
  | FC<IPublishedArticleNotificationProps>
  | FC<ICommentNotificationProps>
  | FC<ILikeNotificationProps>;

export interface INotificationComponentProp extends INotification {
  onClick?: (notification: INotification) => void;
  markAsRead?: (notification: INotification) => void;
  deleteNotification?: (notification: INotification) => void;
  loading?: boolean;
}
