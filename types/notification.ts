import { IArticleProps } from 'components/Article/Article.types';
import { ICommentNotificationProps } from 'components/CommentNotification/CommentNotification.types';
import { ILikeNotificationProps } from 'components/LikeNotification/LikeNotification.types';
import { FC } from 'react';
import { NOTIFICATION_TYPES } from 'variables';

import { IArticleResult } from './article';
import { TAction } from './common';

export type TNotification =
  | typeof NOTIFICATION_TYPES.article
  | typeof NOTIFICATION_TYPES.comment
  | typeof NOTIFICATION_TYPES.like;

interface IBlog {
  id: number;
  name: string;
  imgUrl: string;
}

export interface INotification {
  id: number;
  type: TNotification;
  article: IArticleResult;
  author: IBlog;
}

export type TNotificationComponent =
  | FC<IArticleProps>
  | FC<ICommentNotificationProps>
  | FC<ILikeNotificationProps>;

export interface INotificationComponentProps {
  article: IArticleResult;
  author?: IBlog;
  actions?: TAction[];
}

export interface INotifications {
  [name: TNotification]: {
    component: TNotificationComponent;
    actions: TAction[];
  };
}
