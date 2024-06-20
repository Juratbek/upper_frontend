import { ThemeContext } from 'context';
import { useContext, useMemo } from 'react';
import { THEME_COLORS } from 'variables/theme';

import { IUseTheme } from './useTheme.types';

export const useTheme = (): IUseTheme => {
  const { changeTheme, selectedThemeOption, theme } = useContext(ThemeContext);

  const themeColors = useMemo(() => {
    return THEME_COLORS[theme] ?? THEME_COLORS.light;
  }, [theme]);

  return {
    theme: theme,
    selectedThemeOption,
    themeColors,
    changeTheme,
  };
};
