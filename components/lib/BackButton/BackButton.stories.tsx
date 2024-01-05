import type { Meta, StoryObj } from '@storybook/react';

import { BackButton } from './BackButton';

const meta = {
  title: 'components/lib/Back Button',
  component: BackButton,
} satisfies Meta<typeof BackButton>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
