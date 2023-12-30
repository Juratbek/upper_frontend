import { FC } from 'react';
import { INotification } from 'types';

export type TNotificationComponent = FC<INotificationComponentProp>;

export interface INotificationComponentProp extends INotification {
  className?: string;
}
