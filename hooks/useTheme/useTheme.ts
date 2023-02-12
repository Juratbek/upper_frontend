import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getTheme, setTheme as setStoreTheme } from 'store/states';
import { THEME_COLORS } from 'variables/theme';

import { IUseTheme, TSetTheme } from './useTheme.types';

export const useTheme = (): IUseTheme => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);

  const setTheme: TSetTheme = (theme) => dispatch(setStoreTheme(theme));

  const themeColors = useMemo(() => {
    return THEME_COLORS[theme];
  }, [theme]);

  return {
    theme,
    setTheme,
    themeColors,
  };
};
