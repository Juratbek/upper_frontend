import { createContext } from 'react';

import { IThemeContext } from './ThemeContext.types';

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  changeTheme: () => {
    console.error('changeTheme is not implemented in ThemeProvider');
  },
  selectedThemeOption: 'device-theme',
});
