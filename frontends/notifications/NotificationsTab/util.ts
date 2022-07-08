import { TNotification, TNotificationComponent } from 'types';
import { NOTIFICATIONS } from 'variables';

export const getNotificationComponent = (type: TNotification): TNotificationComponent =>
  NOTIFICATIONS[type].component;
