import { THEME_COLORS } from 'constants/theme';
import { ThemeContext } from 'context';
import { useContext, useMemo } from 'react';

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
