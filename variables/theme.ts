import { ITheme, TTheme } from 'types/theme';

export const THEME_COLORS: Record<TTheme, ITheme> = {
  light: {
    font: 'white',
    icon: 'black',
    bg: 'white',
    border: 'rgba(0, 0, 0, 0.25)',
  },
  dark: {
    font: '#ffffffd9',
    icon: '#ffffffd9',
    bg: '#262a30',
    border: 'rgba(0, 0, 0, 0.25)',
  },
};
