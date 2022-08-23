import { INotificationComponentProps, TIcon } from 'types';

export interface IArticleProps extends INotificationComponentProps {
  className?: string;
  icons?: TIcon[];
  redirectUrl?: string;
}
