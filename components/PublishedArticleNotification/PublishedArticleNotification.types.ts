import { INotification, INotificationComponentProp } from 'types';

export interface IPublishedArticleNotificationProps extends INotificationComponentProp {
  className?: string;
  markAsRead?: (notification: INotification) => void;
  deleteNotification?: (notification: INotification) => void;
}
