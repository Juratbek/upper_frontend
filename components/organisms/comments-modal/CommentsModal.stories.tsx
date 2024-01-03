import type { Meta, StoryObj } from '@storybook/react';

import { CommentsModal } from './CommentsModal';

const meta = {
  title: 'components/organisms/Comments Modal',
  component: CommentsModal,
} satisfies Meta<typeof CommentsModal>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
