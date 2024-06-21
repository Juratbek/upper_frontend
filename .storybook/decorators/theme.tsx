import React from 'react';
import { ThemeProvider } from '../../context';
import { useTheme } from '../../hooks';

const Themed = ({ children }) => {
  const { theme } = useTheme();

  return <div className={`theme-${theme}`}>{children}</div>;
};

export const ThemeDecorator = (Story) => (
  <ThemeProvider defaultTheme='light'>
    <Themed>
      <Story />
    </Themed>
  </ThemeProvider>
);
