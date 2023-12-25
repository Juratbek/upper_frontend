import type { Meta, StoryObj } from '@storybook/react';

import { BottomNavigation } from './BottomNavigation';

const meta = {
  title: 'components/organisms/BottomNavigation',
  component: BottomNavigation,
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
