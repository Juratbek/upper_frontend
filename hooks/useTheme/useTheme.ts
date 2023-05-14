import { ThemeContext } from 'context';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import { TTheme } from 'types';
import { THEME_COLORS } from 'variables/theme';

import { IUseTheme } from './useTheme.types';

export const useTheme = (): IUseTheme => {
  const { changeTheme, selectedThemeOption, ...context } = useContext(ThemeContext);
  const { query } = useRouter();
  const theme = useMemo(
    () => (query.theme as TTheme) || context.theme,
    [context.theme, query.theme],
  );

  const themeColors = useMemo(() => {
    return THEME_COLORS[theme] || THEME_COLORS.light;
  }, [theme]);

  return {
    theme: theme,
    selectedThemeOption,
    themeColors,
    changeTheme,
  };
};
