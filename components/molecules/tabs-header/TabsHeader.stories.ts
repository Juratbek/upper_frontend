import type { Meta, StoryObj } from '@storybook/react';

import { TabsHeader } from './TabsHeader';
import { mockTabs } from './TabsHeader.mock';

const meta = {
  title: 'components/molecules/Tabs Header',
  component: TabsHeader,
} satisfies Meta<typeof TabsHeader>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    tabs: mockTabs,
    activeTab: 'draft',
  },
};
