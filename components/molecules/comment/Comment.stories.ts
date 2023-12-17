import type { Meta, StoryObj } from '@storybook/react';
import { IComment } from 'types';

import { Comment } from './Comment';

const meta = {
  title: 'components/lib/Comment',
  component: Comment,
} satisfies Meta<typeof Comment>;

export default meta;

type TStory = StoryObj<typeof meta>;

const mock: IComment = {
  author: {
    id: 1,
    name: 'Developer',
    imgUrl: '',
  },
  date: new Date().toString(),
  id: 1,
  text: 'Ajoyib',
};

export const Default: TStory = {
  args: {
    ...mock,
    currentBlog: {
      id: 2,
    },
  },
};
