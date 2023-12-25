import type { Preview } from '@storybook/react';
import { ReactQueryDecorator } from './decorators/react-query';
import '../styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [ReactQueryDecorator],
};

export default preview;
