import { TTheme } from 'types';

export const getDeviceTheme = (): TTheme => {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  return darkThemeMq.matches ? 'dark' : 'light';
};
