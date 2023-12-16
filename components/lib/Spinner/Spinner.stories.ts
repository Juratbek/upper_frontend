import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta = {
  title: 'components/lib/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
