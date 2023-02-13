import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  getSelectedThemeOption,
  getTheme,
  setSelectedThemeOption as setStoreSelectedThemeOption,
  setTheme as setStoreTheme,
} from 'store/states';
import { TSelectedThemeOption, TTheme } from 'types';
import { getDeviceTheme } from 'utils';
import { THEME_COLORS } from 'variables/theme';

import { USER_THEME } from './useTheme.constants';
import { IUseTheme, TSetSelectedThemeOption, TSetTheme } from './useTheme.types';

export const useTheme = (): IUseTheme => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  const selectedThemeOption = useAppSelector(getSelectedThemeOption);

  const setTheme: TSetTheme = (theme) => dispatch(setStoreTheme(theme));

  const setSelectedThemeOption: TSetSelectedThemeOption = (theme) =>
    dispatch(setStoreSelectedThemeOption(theme));

  const themeColors = useMemo(() => {
    return THEME_COLORS[theme];
  }, [theme]);

  useEffect(() => {
    const selectedThemeOption = localStorage.getItem(USER_THEME) as TSelectedThemeOption | null;
    selectedThemeOption && setSelectedThemeOption(selectedThemeOption);
    if (selectedThemeOption === 'device-theme' || !selectedThemeOption) {
      const deviceTheme = getDeviceTheme();
      setTheme(deviceTheme);
      setSelectedThemeOption('device-theme');
      return;
    }
    setTheme(selectedThemeOption as TTheme);
  }, []);

  return {
    theme,
    selectedThemeOption,
    setTheme,
    themeColors,
    setSelectedThemeOption,
  };
};
