import type { Meta, StoryObj } from '@storybook/react';

import { SubscriptionButton } from './SubscriptionButton';

const meta = {
  title: 'components/molecules/Subscription Button',
  component: SubscriptionButton,
} satisfies Meta<typeof SubscriptionButton>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    blogId: 1,
  },
};
