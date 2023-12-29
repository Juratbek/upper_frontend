import { IArticleSmall } from './article';
import { IBlogSmall } from './blog';

export type TNotification = 'ARTICLE_PUBLISHED' | 'COMMENT' | 'LIKED' | 'MESSAGE';
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
