import type { Meta, StoryObj } from '@storybook/react';

import { Article } from './Article';
import { IArticleProps } from './Article.types';

const meta = {
  title: 'components/molecules/Article',
  component: (props: IArticleProps): JSX.Element => (
    <div style={{ width: 720 }}>
      <Article {...props} />
    </div>
  ),
} satisfies Meta<typeof Article>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    article: {
      content:
        'Actually, it is not a good idea to compare JavaScript with Rust. Because while JavaScript is a scripting language, Rust is a low level language which mainly focused on performance. JavaScript is mainly used in web development, you can also use it in mobile development and desctop development. While Rust is used in services where performance is main thing',
      id: 1,
      title: 'JavaScript vs Rust',
    },
  },
};
