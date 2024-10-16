import type { Preview } from '@storybook/react';
import { ReactQueryDecorator } from './decorators/react-query';
import '../styles/index.scss';
import { ReduxDecorator } from './decorators/redux';
import { ThemeDecorator } from './decorators/theme';

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
  decorators: [ReactQueryDecorator, ReduxDecorator, ThemeDecorator],
};

export default preview;
