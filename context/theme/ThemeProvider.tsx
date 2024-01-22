import { useUrlParams } from 'hooks';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { TSelectedThemeOption, TTheme } from 'types';
import { getDeviceTheme, setServerSideTheme } from 'utils';
import { USER_THEME } from 'variables';

import { ThemeContext } from './ThemeContext';

interface IThemeProviderProps {
  children: ReactNode;
  defaultTheme: TTheme;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children, defaultTheme = 'light' }) => {
  const [theme, setTheme] = useState<TTheme>(defaultTheme);
  const [selectedThemeOption, setSelectedThemeOption] =
    useState<TSelectedThemeOption>('device-theme');
  const { location } = useUrlParams();

  const changeTheme = useCallback((theme: TTheme): void => {
    // TODO: change to setTheme(theme); when dark theme is ready
    setTheme('light');
    setServerSideTheme(location.origin, theme);
  }, []);

  const changeThemeHandler = useCallback(
    (themeOption: TSelectedThemeOption): void => {
      setSelectedThemeOption(themeOption);
      localStorage.setItem(USER_THEME, themeOption);

      if (themeOption === 'device-theme') {
        const deviceTheme = getDeviceTheme();
        changeTheme(deviceTheme);
        return;
      }
      changeTheme(themeOption);
    },
    [changeTheme],
  );

  useEffect(() => {
    const selectedThemeOption = (localStorage.getItem(USER_THEME) ||
      'device-theme') as TSelectedThemeOption;

    changeThemeHandler(selectedThemeOption);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme: changeThemeHandler, selectedThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
};
