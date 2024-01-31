import type { Meta, StoryObj } from '@storybook/react';

import { Labels } from './Labels';

const meta = {
  title: 'components/molecules/Labels',
  component: (props) => (
    <div style={{ width: 720 }}>
      <Labels {...props} />
    </div>
  ),
} satisfies Meta<typeof Labels>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Primary: TStory = {
  args: {
    labels: [
      'Top',
      'Java',
      'JavaScript',
      'TypeScript',
      'HTML',
      'C',
      'SQL',
      'Python',
      'C++',
      'Go',
      'C#',
      'PHP',
      'Swift',
      'Kotlin',
      'Rust',
    ],
    activeLabel: 'React',
  },
};
