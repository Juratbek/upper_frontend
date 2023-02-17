import { TTheme } from 'types';

export const getDeviceTheme = (): TTheme => {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  return darkThemeMq.matches ? 'dark' : 'light';
};

export const setServerSideTheme = (origin: string, theme: TTheme): Promise<Response> =>
  fetch(`${origin}/api/theme?theme=${theme}`);
