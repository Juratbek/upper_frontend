import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta = {
  title: 'components/lib/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
