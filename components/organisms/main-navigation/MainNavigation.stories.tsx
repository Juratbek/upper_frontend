import type { Meta, StoryObj } from '@storybook/react';

import { MainNavigation } from './MainNavigation';

const meta = {
  title: 'components/organisms/Main Navigation',
  component: (props): JSX.Element => <MainNavigation {...props} />,
} satisfies Meta<typeof MainNavigation>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {},
};
