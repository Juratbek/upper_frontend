import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';
import { IBadgeProp } from './Badge.types';

const meta = {
  title: 'components/lib/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type TStory = StoryObj<typeof meta>;

const mock: IBadgeProp = {
  children: 12,
};

export const Default: TStory = {
  args: mock,
};
