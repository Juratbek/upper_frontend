import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  title: 'components/lib/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    name: "Jur'atbek",
    imgUrl:
      'https://upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com/1/21a46cc7-cb3b-4c88-82da-dbf3f29ae85d',
  },
};
