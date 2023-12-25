import type { Meta, StoryObj } from '@storybook/react';
import { IComment } from 'types';

import { Comment } from './Comment';

const meta = {
  title: 'components/molecules/Comment',
  component: (props): JSX.Element => (
    <div style={{ width: 344 }}>
      <Comment {...props} />
    </div>
  ),
} satisfies Meta<typeof Comment>;

export default meta;

type TStory = StoryObj<typeof meta>;

const mock: IComment = {
  author: {
    id: 1,
    name: 'Aleksey Kuzmin',
    imgUrl:
      'https://upper-prod-blog-img-bucket.s3.ap-south-1.amazonaws.com/1/21a46cc7-cb3b-4c88-82da-dbf3f29ae85d',
  },
  date: new Date().toString(),
  id: 1,
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi inventore debitis tenetur.',
};

export const Default: TStory = {
  args: {
    ...mock,
    currentBlog: {
      id: 2,
    },
  },
};
