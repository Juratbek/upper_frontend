import type { Meta, StoryObj } from '@storybook/react';

import { INotificationComponentProp } from '../Notification.types';
import { PublishedArticleNotification } from './PublishedArticleNotification';

const meta = {
  title: 'components/molecules/Published Article Notification',
  component: (props): JSX.Element => (
    <div style={{ width: 720, margin: 100 }}>
      <PublishedArticleNotification {...props} />
    </div>
  ),
} satisfies Meta<typeof PublishedArticleNotification>;

export default meta;

type TStory = StoryObj<typeof meta>;

const mock: INotificationComponentProp = {
  author: {
    id: 1,
    name: 'Aleksey Kuzmin',
    imgUrl:
      'https://upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com/1/21a46cc7-cb3b-4c88-82da-dbf3f29ae85d',
  },
  id: 1,
  article: {
    id: 12,
    title: "JavaScript eng zo'ri",
  },
  createdDate: new Date().toString(),
  status: 'UNREAD',
  type: 'COMMENT',
};

export const Default: TStory = {
  args: mock,
};
