import { Divider } from 'components';
import { FC } from 'react';
import { IArticleResult, INotification } from 'types';
import { NOTIFICATIONS } from 'variables';

import { getNotificationComponent } from './util';

const author = {
  id: 1,
  name: 'Author name',
  imgUrl: '',
};

const labels = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'TypeScript',
  },
];

const article: IArticleResult = {
  id: 1,
  title: 'Article title',
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
  labels,
  publishedDate: new Date(),
};

const notifications: INotification[] = [
  {
    id: 1,
    type: 'article',
    author,
    article,
  },
  {
    id: 2,
    type: 'comment',
    author,
    article,
  },
  {
    id: 3,
    type: 'like',
    author,
    article,
  },
];

export const NotificationsTab: FC = () => {
  return (
    <div className='tab'>
      {notifications.map((notification, index) => {
        const Notification = getNotificationComponent(notification.type);
        const actions = NOTIFICATIONS[notification.type].actions;
        return (
          <div key={notification.id}>
            <Notification {...notification} actions={actions} className='px-2 py-2' />
            {index !== notifications.length - 1 && <Divider className='w-75 mx-auto' />}
          </div>
        );
      })}
    </div>
  );
};
